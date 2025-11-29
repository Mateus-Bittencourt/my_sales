import AppError from '@shared/erros/AppError'
import { Customer } from '../infra/database/entities/Customer'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer'

export default class UpdateCustomerService {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id)
    if (!customer) throw new AppError('Customer not found.', 404)

    if (email && email !== customer.email) {
      const customerExists = await this.customersRepository.findByEmail(email)
      if (customerExists && customerExists.id !== id) {
        throw new AppError(
          'There is already one customer with this email.',
          409
        )
      }
    }

    if (name) customer.name = name
    if (email) customer.email = email

    await this.customersRepository.save(customer)

    return customer
  }
}
