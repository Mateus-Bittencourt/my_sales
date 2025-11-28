import AppError from '@shared/erros/AppError'
import { customersRepositories } from '../infra/database/repositories/CustomersRepositories'
import { Customer } from '../infra/database/entities/Customer'

interface IShowCustomer {
  id: number
}

export default class ShowCustomerService {
  async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await customersRepositories.findById(id)
    if (!customer) throw new AppError('Customer not found.', 404)

    return customer
  }
}
