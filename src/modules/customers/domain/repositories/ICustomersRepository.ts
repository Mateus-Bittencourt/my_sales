import { ICustomer } from '../models/ICustomer'
import { ICreateCustomer } from '../models/ICreateCustomer'

export interface Pagination {
  take: number
  skip: number
}

export interface ICustomersRepository {
  findAndCount(pagination: Pagination): Promise<[ICustomer[], number]>
  findById(id: number): Promise<ICustomer | null>
  findByEmail(email: string): Promise<ICustomer | null>
  findByName(name: string): Promise<ICustomer | null>
  create(data: ICreateCustomer): Promise<ICustomer>
  save(customer: ICustomer): Promise<ICustomer>
  remove(customer: ICustomer): Promise<void>
}
