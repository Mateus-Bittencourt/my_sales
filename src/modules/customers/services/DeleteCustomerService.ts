import AppError from '@shared/erros/AppError'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'

interface IDeleteCustomer {
  id: number
}

export default class DeleteCustomerService {
  constructor(private readonly customersRepository: ICustomersRepository) {}
  async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id)
    if (!customer) throw new AppError('Customer not found.', 404)

    await this.customersRepository.remove(customer)
  }
}
