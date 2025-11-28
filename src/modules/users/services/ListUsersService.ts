import { instanceToInstance } from 'class-transformer'
import { User } from '../infra/database/entities/User'
import { usersRepositories } from '../infra/database/repositories/UsersRepositories'

export default class ListUsersService {
  execute = async (): Promise<User[]> =>
    instanceToInstance(await usersRepositories.find())
}
