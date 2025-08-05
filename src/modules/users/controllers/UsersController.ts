import { Request, Response } from 'express'
import ListUsersService from '../services/ListUsersService'
import CreateUserService from '../services/CreateUserService'

export default class UsersController {
  // referencia para não se perder nas arrowsfunctions
  // async index(_request: Request, response: Response): Promise<Response> {
  //   const listUsersService = new ListUsersService()
  //   const users = await listUsersService.execute()
  //   return response.json(users)
  // }

  index = async (_request: Request, response: Response): Promise<Response> =>
    response.json(await new ListUsersService().execute())

  create = async (request: Request, response: Response): Promise<Response> =>
    response.status(201).json(
      await new CreateUserService().execute({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
      })
    )
}
