import { container } from 'tsyringe'
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository'
import CustomersRepository from '@modules/customers/infra/database/repositories/CustomersRepository'

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository
)
