import AppError from "@shared/erros/AppError";
import { Order } from "../infra/database/entities/Order";
import { ordersRepository } from "../infra/database/repositories/OrdersRepositories";

export class ShowOrderService {
  async execute(id: number): Promise<Order> {
    const order = await ordersRepository.findById(id)
    if (!order) throw new AppError('Order not found', 404)

    return order
  }
}
