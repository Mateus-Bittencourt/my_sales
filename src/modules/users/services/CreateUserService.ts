import AppError from '@shared/erros/AppError'
import { IUser } from '../domain/models/IUser'
import { hash } from 'bcrypt'
import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../domain/repositories/IUsersRepository'
import { ICreateUser } from '../domain/models/ICreateUser'

@injectable()
export default class CreateUserService {
  constructor(
    // @ts-ignore
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email)
    if (emailExists) throw new AppError('Email address already used.', 409)

    const hashedPassword = await hash(password, 10)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return instanceToInstance(user)
  }
}
