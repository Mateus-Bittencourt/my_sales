import { Customer } from '../database/entities/Customer'
import { customersRepositories } from '../database/repositories/CustomersRepositories'

export default class ListCustomersService {
  execute = async (): Promise<Customer[]> => await customersRepositories.find()
}
