import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { Customer } from '../entities/Customer'
import {
  ICustomersRepository,
  Pagination,
} from '../../../domain/repositories/ICustomersRepository'
import { ICreateCustomer } from '../../../domain/models/ICreateCustomer'
import { ICustomer } from '../../../domain/models/ICustomer'

export default class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Customer)
  }

  public async findAndCount(
    pagination: Pagination
  ): Promise<[ICustomer[], number]> {
    return this.ormRepository.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
    })
  }

  public async findAll(): Promise<ICustomer[]> {
    return this.ormRepository.find()
  }

  public async findByName(name: string): Promise<ICustomer | null> {
    return this.ormRepository.findOneBy({ name })
  }

  public async findById(id: number): Promise<ICustomer | null> {
    return this.ormRepository.findOneBy({ id })
  }

  public async findByEmail(email: string): Promise<ICustomer | null> {
    return this.ormRepository.findOneBy({ email })
  }

  public async create(data: ICreateCustomer): Promise<ICustomer> {
    const entity = this.ormRepository.create(data)
    return this.ormRepository.save(entity)
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    return this.ormRepository.save(customer as Customer)
  }

  public async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer as Customer)
  }
}
