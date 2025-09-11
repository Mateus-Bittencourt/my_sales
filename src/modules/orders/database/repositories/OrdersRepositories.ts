import { AppDataSource } from '@shared/typeorm/data-source'
import { Order } from '../entities/Order'
import { Customer } from '@modules/customers/database/entities/Customer'
// import { OrderProduct } from '@modules/orders/database/entities/OrderProduct'

interface ICreateOrder {
  customer: Customer
  order_products: ICreateOrderProduct[]
}
interface ICreateOrderProduct {
  product_id: number
  price: number
  quantity: number
}

export const ordersRepository = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    return this.findOne({
      where: { id },
      relations: ['customer', 'order_product', 'order_product.product'],
    })
  },

  async createOrder({
    customer,
    order_products,
  }: ICreateOrder): Promise<Order> {
    const order = this.create({
      customer,
      order_products,
    })

    await this.save(order)
    return order
  },
})
