import AppError from '@shared/erros/AppError'
import { Product } from '../database/entities/Product'
import { productsRepositories } from '../database/repositories/ProductsRepositories'

interface IUpdateProduct {
  id: number
  name: string
  price: number
  quantity: number
}

export default class UpdateProductService {
  async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    const product = await productsRepositories.findById(id)
    if (!product) throw new AppError('Product not found.', 404)

    const productExists = await productsRepositories.findByName(name)
    if (productExists)
      throw new AppError('There is already one product with this name', 409)

    product.name = name
    product.price = price
    product.quantity = quantity

    productsRepositories.save(product)

    return product
  }
}
