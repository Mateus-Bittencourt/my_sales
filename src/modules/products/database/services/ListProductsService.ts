import { Product } from '../entities/Product'
import { productsRepositories } from '../repositories/ProductsRepositories'

export default class ListProductsService {
  execute = async (): Promise<Product[]> => await productsRepositories.find()
}
