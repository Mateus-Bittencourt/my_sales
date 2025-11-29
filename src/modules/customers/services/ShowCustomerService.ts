import AppError from '@shared/erros/AppError'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'
import { Customer } from '../infra/database/entities/Customer'
import { inject, injectable } from 'tsyringe'

interface IShowCustomer {
  id: number
}

@injectable()
export default class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository
  ) {}

  async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id)
    if (!customer) throw new AppError('Customer not found.', 404)

    return customer
  }
}
