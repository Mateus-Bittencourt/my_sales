import { Request, Response } from 'express'
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService'

export default class SendForgotPasswordController {
  create = async (request: Request, response: Response): Promise<Response> =>
    response.status(204).json(
      await new SendForgotPasswordEmailService().execute({
        email: request.body.email,
      })
    )
}
