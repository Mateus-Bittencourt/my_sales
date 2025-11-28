import AppError from '@shared/erros/AppError'
import { customersRepositories } from '../infra/database/repositories/CustomersRepositories'

interface IDeleteCustomer {
  id: number
}

export default class DeleteCustomerService {
  async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await customersRepositories.findById(id)
    if (!customer) throw new AppError('Customer not found.', 404)

    await customersRepositories.remove(customer)
  }
}
