import AppError from '@shared/erros/AppError'
import { Product } from '../infra/database/entities/Product'
import { productsRepositories } from '../infra/database/repositories/ProductsRepositories'
import { redisCache } from '@config/cache'

interface ICreateProduct {
  name: string
  price: number
  quantity: number
}

export default class CreateProductService {
  async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {
    const productExists = await productsRepositories.findByName(name)

    if (productExists)
      throw new AppError('There is already one product with this name.', 409)

    const product = productsRepositories.create({ name, price, quantity })

    await productsRepositories.save(product)
    await redisCache.invalidate('api-mysales-products')

    return product
  }
}
