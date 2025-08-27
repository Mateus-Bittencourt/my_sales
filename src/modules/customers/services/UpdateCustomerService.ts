import AppError from '@shared/erros/AppError'
import { Customer } from '../database/entities/Customer'
import { customersRepositories } from '../database/repositories/CustomersRepositories'

interface IUpdateCustomer {
  id: number
  name: string
  email: string
}

export default class UpdateCustomerService {
  async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
    const customer = await customersRepositories.findById(id)
    if (!customer) throw new AppError('Customer not found.', 404)

    const customerExists = await customersRepositories.findByEmail(email)
    if (customerExists)
      throw new AppError('There is already one customer with this email.', 409)

    customer.name = name
    customer.email = email

    customersRepositories.save(customer)

    return customer
  }
}
