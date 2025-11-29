import AppError from '@shared/erros/AppError'
import { Customer } from '../infra/database/entities/Customer'
import { ICreateCustomer } from '../domain/models/ICreateCustomer'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'

export default class CreateCustomerService {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await this.customersRepository.findByEmail(email)
    if (emailExists) throw new AppError('Email address already used.', 409)

    return await this.customersRepository.create({
      name: name.trim(),
      email: email.trim(),
    })
  }
}
