import { Product } from '../database/entities/Product'
import { productsRepositories } from '../database/repositories/ProductsRepositories'
import { redisCache } from '@config/cache'
export default class ListProductsService {
  async execute(): Promise<Product[]> {


    let products = await redisCache.recover<Product[]>('api-mysales-products')
    if (!products) {
      products = await productsRepositories.find()
      await redisCache.save(
        'api-mysales-products',
        JSON.stringify(products),
        1800
      )
    }

    return products
  }
}
