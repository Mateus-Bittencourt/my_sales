import { Request, Response } from 'express'
import ShowProfileService from '../../../services/ShowProfileService'
import UpdateProfileService from '../../../services/UpdateProfileService'

export default class ProfileController {
  show = async (request: Request, response: Response): Promise<Response> =>
    response.json(
      await new ShowProfileService().execute({
        userId: Number(request.user?.id),
      })
    )

  update = async (request: Request, response: Response): Promise<Response> =>
    response.json(
      await new UpdateProfileService().execute({
        userId: Number(request.user?.id),
        name: request.body?.name,
        email: request.body?.email,
        password: request.body?.password,
        old_password: request.body?.old_password,
      })
    )
}
