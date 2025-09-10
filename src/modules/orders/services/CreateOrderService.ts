import { Product } from '@modules/products/database/entities/Product'
import AppError from '@shared/erros/AppError'
import { Order } from '../database/entities/Order'
import { customersRepositories } from '@modules/customers/database/repositories/CustomersRepositories'
import { productsRepositories } from '@modules/products/database/repositories/ProductsRepositories'
import { ordersRepository } from '../database/repositories/OrdersRepositories'
import { In } from 'typeorm'

interface ICreateOrder {
  customerId: number
  products: Product[]
}

export default class CreateOrderService {
  async execute({ customerId, products }: ICreateOrder): Promise<Order> {
    const customerExists = await customersRepositories.findById(customerId)
    if (!customerExists)
      throw new AppError('Could not find any customer with the given id.', 404)

    const productIds = products.map(product => product.id)
    const existingProducts = await productsRepositories.findAllByIds(productIds)
    if (!existingProducts.length)
      throw new AppError('Could not find any products with the given ids.', 404)

    const existingProductIds = new Set(existingProducts.map(p => p.id))
    const inexistentProducts = products.filter(
      product => !existingProductIds.has(product.id)
    )

    if (inexistentProducts.length)
      throw new AppError(
        `Could not find product ${inexistentProducts[0].id}.`,
        404
      )

    const existingProductsMap = new Map(existingProducts.map(p => [p.id, p]))

    const quantityNotAvailable = products.filter(product => {
      const foundProduct = existingProductsMap.get(product.id)
      return foundProduct && product.quantity > foundProduct.quantity
    })

    if (quantityNotAvailable.length)
      throw new AppError(
        `Insufficient quantity for product ${quantityNotAvailable[0].id}.`,
        409
      )

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existingProductsMap.get(product.id)!.price,
    }))

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      order_products: serializedProducts,
    })

    const { order_products } = order

    const updatedProductsQuantities = order_products.map(product => ({
      product_id: product.product_id,
      quantity:
        existingProductsMap.get(product.product_id)!.quantity -
        product.quantity,
    }))

    await productsRepositories.save(updatedProductsQuantities)

    return order
  }
}
