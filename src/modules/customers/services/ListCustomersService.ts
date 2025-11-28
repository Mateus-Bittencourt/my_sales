import { customersRepositories } from '../infra/database/repositories/CustomersRepositories'
import { IResponse, IPageOptions } from '@shared/interfaces/response.interface'

interface ICustomerDTO {
  id: number
  name: string
  email: string
}

export default class ListCustomersService {
  constructor(private readonly customersRepo = customersRepositories) {}

  async execute({
    page = 1,
    limit = 10,
  }: IPageOptions): Promise<IResponse<ICustomerDTO[]>> {
    const [data, total] = await this.customersRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'ASC' },
    })

    return {
      data: data.map(customer => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
      })),
      pagination: {
        currentPage: page,
        perPage: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }
}
