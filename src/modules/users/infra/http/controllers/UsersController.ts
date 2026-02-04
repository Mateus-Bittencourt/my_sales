import { Request, Response } from 'express'
import ListUsersService from '../../../services/ListUsersService'
import CreateUserService from '../../../services/CreateUserService'
import { container } from 'tsyringe'

export default class UsersController {
  index = async (_request: Request, response: Response): Promise<Response> =>
    response
      .json(await container.resolve(ListUsersService).execute())

  create = async (request: Request, response: Response): Promise<Response> =>
    response.status(201).json(
      await container.resolve(CreateUserService).execute({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
      })
    )
}
