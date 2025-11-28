import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { Product } from '../entities/Product'
import { In } from 'typeorm/find-options/operator/In'

export const productsRepositories = AppDataSource.getRepository(Product).extend(
  {
    async findByName(name: string): Promise<Product | null> {
      return this.findOneBy({ name })
    },

    async findById(id: number): Promise<Product | null> {
      return this.findOneBy({ id })
    },

    async findAllByIds(ids: number[]): Promise<Product[]> {
      return this.findBy({ id: In(ids) })
    }
  }
)
