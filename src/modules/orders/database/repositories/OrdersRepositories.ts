import { AppDataSource } from '@shared/typeorm/data-source'
import { Order } from '../entities/Order'
import { Customer } from '@modules/customers/database/entities/Customer'
import { EntityManager } from 'typeorm'
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
  async findById(id: number, manager?: EntityManager): Promise<Order | null> {
    const repo = manager ? manager.getRepository(Order) : this
    return repo.findOne({
      where: { id },
      relations: ['customer', 'order_products', 'order_products.product'],
    })
  },

  async createOrder({
    customer,
    order_products,
  }: ICreateOrder, manager?: EntityManager): Promise<Order> {
    const repo = manager ? manager.getRepository(Order) : this
    const order = repo.create({
      customer,
      order_products,
    })

    await repo.save(order)
    return order
  },
})
