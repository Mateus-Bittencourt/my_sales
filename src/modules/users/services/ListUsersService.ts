import { User } from '../database/entities/User'
import { usersRepositories } from '../database/repositories/UsersRepositories'

export default class ListUsersService {
  execute = async (): Promise<User[]> => await usersRepositories.find()
}
