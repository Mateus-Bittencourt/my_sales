import AppError from '@shared/erros/AppError'
import { productsRepositories } from '../database/repositories/ProductsRepositories'
import { redisCache } from '@config/cache'

interface IDeleteProduct {
  id: number
}

export default class DeleteProductService {
  async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await productsRepositories.findById(id)
    if (!product) throw new AppError('Product not found.', 404)

    await productsRepositories.remove(product)
    await redisCache.invalidate('api-mysales-products')
  }
}
