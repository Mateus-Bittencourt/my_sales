import { IUser } from '../models/IUser'
import { ICreateUser } from '../models/ICreateUser'

export interface Pagination {
  take: number
  skip: number
}

export interface IUsersRepository {
  findAll(): Promise<IUser[]>
  findById(id: number): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>
  // findAndCount(pagination: Pagination): Promise<[IUser[], number]>
  create(data: ICreateUser): Promise<IUser>
  // save(user: IUser): Promise<IUser>
  // remove(user: IUser): Promise<void>
}
