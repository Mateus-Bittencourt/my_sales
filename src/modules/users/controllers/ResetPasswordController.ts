import { Request, Response } from 'express'
import ResetPasswordService from '../services/ResetPasswordService'

export default class ResetForgotPasswordController {
  create = async (request: Request, response: Response): Promise<Response> =>
    response.status(204).json(
      await new ResetPasswordService().execute({
        password: request.body.password,
        token: request.body.token,
      })
    )
}
