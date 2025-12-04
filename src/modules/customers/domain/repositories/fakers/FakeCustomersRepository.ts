import { ICustomer } from '../../models/ICustomer'
import { ICustomersRepository, Pagination } from '../ICustomersRepository'
import { ICreateCustomer } from '../../models/ICreateCustomer'
import { Customer } from '../../../infra/database/entities/Customer'

export default class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = []

  async findByEmail(email: string): Promise<ICustomer | null> {
    const found = this.customers.find(c => c.email === email)
    return found ?? null
  }

  async findByName(name: string): Promise<ICustomer | null> {
    const found = this.customers.find(c => c.name === name)
    return found ?? null
  }

  async findAll(): Promise<ICustomer[]> {
    return [...this.customers]
  }

  async findAndCount({ skip, take }: Pagination): Promise<[ICustomer[], number]> {
    const total = this.customers.length
    const start = Math.max(0, skip)
    const end = take > 0 ? start + take : total
    const page = this.customers.slice(start, end)
    return [page, total]
  }

  async findById(id: number): Promise<ICustomer | null> {
    const found = this.customers.find(c => c.id === id)
    return found ?? null
  }

  async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer()
    customer.id = this.customers.length + 1
    customer.name = name
    customer.email = email
    customer.createdAt = new Date()
    customer.updatedAt = new Date()

    this.customers.push(customer)

    return customer
  }
  async save(customer: ICustomer): Promise<ICustomer> {
    const index = this.customers.findIndex(c => c.id === customer.id)
    if (index === -1) {
      const newCustomer = new Customer()
      newCustomer.id = this.customers.length + 1
      newCustomer.name = customer.name
      newCustomer.email = customer.email
      newCustomer.createdAt = new Date()
      newCustomer.updatedAt = new Date()
      this.customers.push(newCustomer)
      return newCustomer
    }
    const existing = this.customers[index]
    existing.name = customer.name
    existing.email = customer.email
    existing.updatedAt = new Date()
    this.customers[index] = existing
    return existing
  }

  async remove(customer: ICustomer): Promise<void> {
    this.customers = this.customers.filter(c => c.id !== customer.id)
  }
}
