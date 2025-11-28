import AppError from '@shared/erros/AppError'
import { usersRepositories } from '../infra/database/repositories/UsersRepositories'
import { compare } from 'bcrypt'
import { Secret, sign } from 'jsonwebtoken'

interface ISessionUser {
  email: string
  password: string
}

interface ISessionResponse {
  token: string
}

export default class SessionUserService {
  async execute({ email, password }: ISessionUser): Promise<ISessionResponse> {
    if (!process.env.app_secret)
      throw new AppError('FATAL_ERROR: JWT Secret not defined.')

    const user = await usersRepositories.findByEmail(email)
    if (!user) throw new AppError('Invalid Email/password.', 401)

    const passwordConfirmed = await compare(password, user.password)
    if (!passwordConfirmed) throw new AppError('Invalid Email/password.', 401)

    const token = sign({}, process.env.app_secret as Secret, {
      subject: String(user.id),
      expiresIn: '1d',
    })

    return {
      token,
    }
  }
}
