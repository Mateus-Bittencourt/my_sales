import AppError from '@shared/erros/AppError'
import { Customer } from '../database/entities/Customer'
import { customersRepositories } from '../database/repositories/CustomersRepositories'
import { hash } from 'bcrypt'

interface ICreateCustomer {
  name: string
  email: string
  password: string
}

export default class CreateCustomerService {
  async execute({ name, email, password }: ICreateCustomer): Promise<Customer> {
    const emailExists = await customersRepositories.findByEmail(email)
    if (emailExists) throw new AppError('Email address already used.', 409)


    const customer = customersRepositories.create({
      name,
      email,
    })

    await customersRepositories.save(customer)

    return customer
  }
}
