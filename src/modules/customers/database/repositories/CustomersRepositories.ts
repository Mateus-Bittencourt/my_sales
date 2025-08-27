import { AppDataSource } from '@shared/typeorm/data-source'
import { Customer } from '../entities/Customer'

export const customersRepositories = AppDataSource.getRepository(Customer).extend({
  async findByName(name: string): Promise<Customer | null> {
    return this.findOneBy({ name })
  },
  async findById(id: number): Promise<Customer | null> {
    return this.findOneBy({ id })
  },
  async findByEmail(email: string): Promise<Customer | null> {
    return this.findOneBy({ email })
  },
})
