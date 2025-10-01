import { instanceToInstance } from 'class-transformer'
import { User } from '../database/entities/User'
import { usersRepositories } from '../database/repositories/UsersRepositories'

export default class ListUsersService {
  execute = async (): Promise<User[]> =>
    instanceToInstance(await usersRepositories.find())
}
