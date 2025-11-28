import AppError from '@shared/erros/AppError'
import { Customer } from '../infra/database/entities/Customer'
import { customersRepositories } from '../infra/database/repositories/CustomersRepositories'

interface IUpdateCustomer {
  id: number
  name: string
  email: string
}

export default class UpdateCustomerService {
  async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
    const customer = await customersRepositories.findById(id)
    if (!customer) throw new AppError('Customer not found.', 404)

    if (email && email !== customer.email) {
      const customerExists = await customersRepositories.findByEmail(email)

      if (customerExists && customerExists.id !== id) {
        throw new AppError(
          'There is already one customer with this email.',
          409
        )
      }
    }

    if (name) customer.name = name
    if (email) customer.email = email

    customersRepositories.save(customer)

    return customer
  }
}
