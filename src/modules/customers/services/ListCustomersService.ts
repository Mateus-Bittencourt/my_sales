import { IResponse, IPageOptions } from '@shared/interfaces/response.interface'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'
import { ICustomer } from '../domain/models/ICustomer'
import { inject, injectable } from 'tsyringe'

interface ICustomerDTO {
  id: number
  name: string
  email: string
}
@injectable()
export default class ListCustomersService {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository
  ) {}

  async execute({ page, limit }: IPageOptions): Promise<IResponse<ICustomerDTO[]>> {
    const hasPage = typeof page === 'number' && Number.isFinite(page)
    const hasLimit = typeof limit === 'number' && Number.isFinite(limit)
    const isPaginated = hasPage && hasLimit && page > 0 && limit > 0

    let data: ICustomer[] = []
    let total = 0

    if (!isPaginated) {
      data = await this.customersRepository.findAll()
    } else {
      const skip = (page - 1) * limit
      ;[data, total] = await this.customersRepository.findAndCount({
        skip,
        take: limit,
      })
    }

    const response: IResponse<ICustomerDTO[]> = {
      data: data.map(c => ({ id: c.id, name: c.name, email: c.email })),
    }

    if (isPaginated) {
      response.pagination = {
        currentPage: page,
        perPage: limit,
        totalItems: total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      }
    }

    return response
  }
}