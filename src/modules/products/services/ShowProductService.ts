import AppError from '@shared/erros/AppError'
import { productsRepositories } from '../database/repositories/ProductsRepositories'
import { Product } from '../database/entities/Product'

interface IShowProduct {
  id: number
}

export default class ShowProductService {
  async execute({ id }: IShowProduct): Promise<Product> {
    const product = await productsRepositories.findById(id)

    if (!product) throw new AppError('Product not found.', 404)

    return product
  }
}
