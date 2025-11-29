import { inject, injectable } from 'tsyringe'
import AppError from '@shared/erros/AppError'
import { ICustomer } from '../domain/models/ICustomer'
import { ICreateCustomer } from '../domain/models/ICreateCustomer'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository
  ) {}

  async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email)
    if (emailExists) throw new AppError('Email address already used.', 409)

    return await this.customersRepository.create({
      name: name.trim(),
      email: email.trim(),
    })
  }
}
