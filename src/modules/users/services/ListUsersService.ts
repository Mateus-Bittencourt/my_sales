import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../domain/repositories/IUsersRepository'
import { IUser } from '../domain/models/IUser'

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  execute = async (): Promise<IUser[]> =>
    instanceToInstance(await this.usersRepository.findAll())
}
