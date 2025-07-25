import { Product } from '../database/entities/Product'
import { productsRepositories } from '../database/repositories/ProductsRepositories'

export default class ListProductsService {
  execute = async (): Promise<Product[]> => await productsRepositories.find()
}
