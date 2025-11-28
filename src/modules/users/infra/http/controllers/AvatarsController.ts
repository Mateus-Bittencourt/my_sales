import { Request, Response } from 'express'
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService'

export default class AvatarsController {
  update = async (request: Request, response: Response): Promise<Response> =>
    response.json(
      await new UpdateUserAvatarService().execute({
        userId: Number(request.user?.id),
        avatarFileName: request.file?.filename as string,
      })
    )
}
