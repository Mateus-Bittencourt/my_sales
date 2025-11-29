import AppError from '@shared/erros/AppError'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'
import { Customer } from '../infra/database/entities/Customer'

interface IShowCustomer {
  id: number
}

export default class ShowCustomerService {
    constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id)
    if (!customer) throw new AppError('Customer not found.', 404)

    return customer
  }
}
