import { Product } from '@modules/products/database/entities/Product'
import AppError from '@shared/erros/AppError'
import { Order } from '../database/entities/Order'
import { customersRepositories } from '@modules/customers/database/repositories/CustomersRepositories'
import { productsRepositories } from '@modules/products/database/repositories/ProductsRepositories'
import { ordersRepository } from '../database/repositories/OrdersRepositories'
import { AppDataSource } from '@shared/typeorm/data-source'
import { Customer } from '@modules/customers/database/entities/Customer'

interface IOrderProductInput {
  id: number
  quantity: number
}

interface ICreateOrder {
  customerId: number
  products: IOrderProductInput[]
}

interface IValidateReturn {
  customer: Customer
  order_products: Array<{
    product_id: number
    quantity: number
    price: number
  }>
  existingProductsMap: Map<number, Product>
}

export default class CreateOrderService {
  constructor(
    private readonly ordersRepo = ordersRepository,
    private readonly productsRepo = productsRepositories,
    private readonly customersRepo = customersRepositories
  ) {}

  async execute({ customerId, products }: ICreateOrder): Promise<Order> {
    const { customer, order_products, existingProductsMap } =
      await this.validate({ customerId, products })

    return AppDataSource.transaction(async manager => {
      const created = await this.ordersRepo.createOrder(
        { customer, order_products },
        manager
      )

      await Promise.all(
        created.order_products.map(op =>
          manager
            .getRepository(Product)
            .decrement({ id: op.product_id }, 'quantity', op.quantity)
        )
      )

      return {
        ...created,
        customer,
        order_products: created.order_products.map(op => ({
          ...op,
          product: existingProductsMap.get(op.product_id)!,
        })),
      } as unknown as Order
    })
  }

  private async validate({ customerId, products }: ICreateOrder): Promise<IValidateReturn> {
    if (!products?.length)
      throw new AppError('Products are required to create an order.', 400)

    const requestedById = new Map<number, number>()
    for (const { id, quantity } of products) {
      if (!id || !quantity)
        throw new AppError('Invalid product payload.', 400)
      if (quantity <= 0)
        throw new AppError('Product quantity must be greater than zero.', 400)
      requestedById.set(id, (requestedById.get(id) ?? 0) + quantity)
    }

    const customer = await this.customersRepo.findById(customerId)
    if (!customer)
      throw new AppError('Could not find any customer with the given id.', 404)

    const productIds = [...requestedById.keys()]
    const existingProducts = await this.productsRepo.findAllByIds(productIds)
    if (!existingProducts.length)
      throw new AppError('Could not find any products with the given ids.', 404)

    const existingProductsMap = new Map(existingProducts.map(p => [p.id, p]))
    const inexistent = productIds.filter(id => !existingProductsMap.has(id))
    if (inexistent.length)
      throw new AppError(`Could not find product ${inexistent[0]}.`, 404)

    const insufficient = productIds.find(id => {
      const db = existingProductsMap.get(id)!
      return requestedById.get(id)! > db.quantity
    })
    if (insufficient)
      throw new AppError(
        `Insufficient quantity for products: ${insufficient}.`,
        409
      )

    const order_products = productIds.map(id => ({
      product_id: id,
      quantity: requestedById.get(id)!,
      price: Number(existingProductsMap.get(id)!.price),
    }))

    return { customer, order_products, existingProductsMap }
  }
}





// export default class CreateOrderService {
//   async execute({ customerId, products }: ICreateOrder): Promise<Order> {
//     if (!products?.length)
//       throw new AppError('Products are required to create an order.', 400)

//     const requestedById = new Map<number, number>()
//     for (const { id, quantity } of products) {
//       if (!id || !quantity) throw new AppError('Invalid product payload.', 400)
//       if (quantity <= 0)
//         throw new AppError('Product quantity must be greater than zero.', 400)

//       requestedById.set(id, (requestedById.get(id) ?? 0) + quantity)
//     }

//     const customerExists = await customersRepositories.findById(customerId)
//     if (!customerExists)
//       throw new AppError('Could not find any customer with the given id.', 404)

//     const productIds = [...requestedById.keys()]
//     const existingProducts = await productsRepositories.findAllByIds(productIds)
//     if (!existingProducts.length)
//       throw new AppError('Could not find any products with the given ids.', 404)

//     const existingProductsMap = new Map(existingProducts.map(p => [p.id, p]))
//     const inexistent = productIds.filter(id => !existingProductsMap.has(id))
//     if (inexistent.length)
//       throw new AppError(`Could not find product ${inexistent[0]}.`, 404)

//     const insufficient = productIds.find(id => {
//       const db = existingProductsMap.get(id)!
//       const requestedQuantity = requestedById.get(id)!
//       return requestedQuantity > db.quantity
//     })

//     if (insufficient)
//       throw new AppError(
//         `Insufficient quantity for products: ${insufficient}.`,
//         409
//       )

//     const serializedProducts = productIds.map(id => ({
//       product_id: id,
//       quantity: requestedById.get(id)!,
//       price: existingProductsMap.get(id)!.price * (requestedById.get(id)!),
//     }))

//     return AppDataSource.transaction(async manager => {
//       const created = await ordersRepository.createOrder(
//         {
//           customer: customerExists,
//           order_products: serializedProducts,
//         },
//         manager
//       )

//       await Promise.all(
//         created.order_products.map(op =>
//           manager
//             .getRepository(Product)
//             .decrement({ id: op.product_id }, 'quantity', op.quantity)
//         )
//       )

//       return {
//         ...created,
//         customer: customerExists,
//         order_products: created.order_products.map(op => ({
//           ...op,
//           product: existingProductsMap.get(op.product_id)!,
//         })),
//       }
//     })
//   }
// }
