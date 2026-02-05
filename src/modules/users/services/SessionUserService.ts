import AppError from '@shared/erros/AppError'
import { compare } from 'bcrypt'
import { Secret, sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { ISessionResponse } from '../domain/models/ISessionResponse'
import { ISessionUser } from '../domain/models/ISessionUser'
import { IUsersRepository } from '../domain/repositories/IUsersRepository'

@injectable()
export default class SessionUserService {
  constructor(
    // @ts-ignore
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}


  async execute({ email, password }: ISessionUser): Promise<ISessionResponse> {
    if (!process.env.app_secret)
      throw new AppError('FATAL_ERROR: JWT Secret not defined.')

    const user = await this.usersRepository.findByEmail(email)
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
