import AppError from '@shared/erros/AppError'
import { User } from '../infra/database/entities/User'
import { usersRepositories } from '../infra/database/repositories/UsersRepository'
import path from 'path'
import uploadConfig from '@config/upload'
import fs from 'fs'
import { instanceToInstance } from 'class-transformer'

interface IUpdateUserAvatar {
  userId: number
  avatarFileName: string
}

export default class UpdateUserAvatarService {
  async execute({ userId, avatarFileName }: IUpdateUserAvatar): Promise<User> {
    const user = await usersRepositories.findById(userId)
    if (!user) throw new AppError('User not found.', 404)

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath)
    }

    user.avatar = avatarFileName
    await usersRepositories.save(user)
    return instanceToInstance(user)
  }
}
