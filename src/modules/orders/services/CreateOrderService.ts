import { Product } from '@modules/products/database/entities/Product'
import AppError from '@shared/erros/AppError'
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

interface ICreateOrderResponse {
  id: number
  customer: {
    id: number
    name: string
  }
  order_products: Array<{
    id: number
    price: number
    quantity: number
    product: {
      id: number
      name: string
      price: number
    }
  }>
}

export default class CreateOrderService {
  constructor(
    private readonly ordersRepo = ordersRepository,
    private readonly productsRepo = productsRepositories,
    private readonly customersRepo = customersRepositories
  ) {}

  async execute({
    customerId,
    products,
  }: ICreateOrder): Promise<ICreateOrderResponse> {
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
        id: created.id,
        customer: {
          id: created.customer.id,
          name: created.customer.name,
        },
        order_products: created.order_products.map(op => ({
          id: op.id,
          price: op.price,
          quantity: op.quantity,
          product: {
            id: op.product_id,
            name: existingProductsMap.get(op.product_id)!.name,
            price: existingProductsMap.get(op.product_id)!.price,
          },
        })),
      }
    })
  }

  private async validate({
    customerId,
    products,
  }: ICreateOrder): Promise<IValidateReturn> {
    //
    const requestedById = new Map<number, number>()

    for (const { id, quantity } of products)
      requestedById.set(id, (requestedById.get(id) ?? 0) + quantity)


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
        `Insufficient quantity for products: ${insufficient}. Available: ${existingProductsMap.get(insufficient)!.quantity}`,
        409
      )

    const order_products = productIds.map(id => ({
      product_id: id,
      quantity: requestedById.get(id)!,
      price: Number(existingProductsMap.get(id)!.price) * requestedById.get(id)!,
    }))

    return { customer, order_products, existingProductsMap }
  }
}
