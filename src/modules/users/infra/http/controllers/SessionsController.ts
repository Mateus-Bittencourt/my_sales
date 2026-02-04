import { Request, Response } from 'express'
import SessionUserService from '../../../services/SessionUserService'
import { container } from 'tsyringe'

export default class SessionsControllers {
  create = async (request: Request, response: Response): Promise<Response> =>
    response.status(201).json(
      await container.resolve(SessionUserService).execute({
        email: request.body.email,
        password: request.body.password,
      })
    )
}
