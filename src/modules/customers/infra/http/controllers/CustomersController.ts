import { Request, Response } from 'express'
import ListCustomersService from '../../../services/ListCustomersService'
import ShowCustomerService from '../../../services/ShowCustomerService'
import CreateCustomerService from '../../../services/CreateCustomerService'
import UpdateCustomerService from '../../../services/UpdateCustomerService'
import DeleteCustomerService from '../../../services/DeleteCustomerService'
import { container } from 'tsyringe'

export default class CustomersController {
  index = async (request: Request, response: Response): Promise<Response> =>
    response.json(
      await container.resolve(ListCustomersService).execute({
        page: Number(request.query.page),
        limit: Number(request.query.limit),
      })
    )

  show = async (request: Request, response: Response): Promise<Response> =>
    response.json(
      await container
        .resolve(ShowCustomerService)
        .execute({ id: Number(request.params.id) })
    )

  create = async (request: Request, response: Response): Promise<Response> =>
    response.status(201).json(
      await container.resolve(CreateCustomerService).execute({
        name: request.body.name,
        email: request.body.email,
      })
    )

  update = async (request: Request, response: Response): Promise<Response> =>
    response.json(
      await container.resolve(UpdateCustomerService).execute({
        id: Number(request.params.id),
        name: request.body.name,
        email: request.body.email,
      })
    )

  delete = async (request: Request, response: Response): Promise<void> => {
    await container
      .resolve(DeleteCustomerService)
      .execute({ id: Number(request.params.id) })
    response.status(204).send()
  }
}
