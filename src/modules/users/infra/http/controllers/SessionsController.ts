import { Request, Response } from 'express'
import SessionUserService from '../../../services/SessionUserService'

export default class SessionsControllers {
  create = async (request: Request, response: Response): Promise<Response> =>
    response.status(201).json(
      await new SessionUserService().execute({
        email: request.body.email,
        password: request.body.password,
      })
    )
}
