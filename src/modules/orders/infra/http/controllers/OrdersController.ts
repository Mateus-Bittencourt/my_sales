import { Request, Response } from 'express'
import { ShowOrderService } from '../../../services/ShowOrderService'
import CreateOrderService from '../../../services/CreateOrderService'

export default class OrdersController {
  show = async (request: Request, response: Response): Promise<Response> =>
    response.json(
      await new ShowOrderService().execute(Number(request.params.id))
    )

  create = async (request: Request, response: Response): Promise<Response> =>
    response.status(201).json(await new CreateOrderService().execute({
      customerId: Number(request.body.customerId),
      products: request.body.products,
    }))
}
