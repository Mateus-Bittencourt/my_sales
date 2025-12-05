import { User } from '../../../infra/database/entities/User'
import { IUsersRepository, Pagination } from '../IUsersRepository'
import { IUser } from '../../models/IUser'
import { ICreateUser } from '../../models/ICreateUser'

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  async findByEmail(email: string): Promise<IUser | null> {
    const found = this.users.find(u => u.email === email)
    return found ? this.toDomain(found) : null
  }

  async findById(id: number): Promise<IUser | null> {
    const found = this.users.find(u => u.id === id)
    return found ? this.toDomain(found) : null
  }

  async findAll(): Promise<IUser[]> {
    return this.users.map(u => this.toDomain(u))
  }

  async findAndCount({ skip, take }: Pagination): Promise<[IUser[], number]> {
    const total = this.users.length
    const start = Math.max(0, skip)
    const end = take > 0 ? start + take : total
    const page = this.users.slice(start, end).map(u => this.toDomain(u))
    return [page, total]
  }

  async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = new User()
    user.id = this.users.length + 1
    user.name = name
    user.email = email
    user.password = password
    user.avatar = ''
    user.created_at = new Date()
    user.updated_at = new Date()

    this.users.push(user)
    return this.toDomain(user)
  }

  async save(user: IUser): Promise<IUser> {
    const index = this.users.findIndex(u => u.id === user.id)
    if (index === -1) {
      const newUser = new User()
      newUser.id = this.users.length + 1
      newUser.name = user.name
      newUser.email = user.email
      newUser.password = user.password
      newUser.avatar = user.avatar || ''
      newUser.created_at = new Date()
      newUser.updated_at = new Date()
      this.users.push(newUser)
      return this.toDomain(newUser)
    }
    const existing = this.users[index]
    existing.name = user.name
    existing.email = user.email
    existing.password = user.password
    existing.avatar = user.avatar || existing.avatar
    existing.updated_at = new Date()
    this.users[index] = existing
    return this.toDomain(existing)
  }

  async remove(user: IUser): Promise<void> {
    this.users = this.users.filter(u => u.id !== user.id)
  }

  private toDomain(u: User): IUser {
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password,
      avatar: u.avatar,
      createdAt: u.created_at,
      updatedAt: u.updated_at,
    }
  }
}
