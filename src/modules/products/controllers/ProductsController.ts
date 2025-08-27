import { Request, Response } from 'express'
import ListProductsService from '../services/ListProductsService'
import ShowProductService from '../services/ShowProductService'
import CreateProductService from '../services/CreateProductService'
import UpdateProductService from '../services/UpdateProductService'
import DeleteProductService from '../services/DeleteProductService'

export default class ProductsController {
  // referencia para não se perder nas arrowsfunctions
  // async index(_request: Request, response: Response): Promise<Response> {
  //   const listProductsService = new ListProductsService()
  //   const products = await listProductsService.execute()
  //   return response.json(products)
  // }

  index = async (_request: Request, response: Response): Promise<Response> =>
    response.json(await new ListProductsService().execute())

  show = async (request: Request, response: Response): Promise<Response> =>
    response.json(
      await new ShowProductService().execute({ id: Number(request.params.id) })
    )

  create = async (request: Request, response: Response): Promise<Response> =>
    response.status(201).json(
      await new CreateProductService().execute({
        name: request.body.name,
        price: Number(request.body.price),
        quantity: Number(request.body.quantity),
      })
    )

  update = async (request: Request, response: Response): Promise<Response> =>
    response.json(
      await new UpdateProductService().execute({
        id: Number(request.params.id),
        name: request.body.name,
        price: Number(request.body.price),
        quantity: Number(request.body.quantity),
      })
    )

  delete = async (request: Request, response: Response): Promise<void> => {
    await new DeleteProductService().execute({ id: Number(request.params.id) })
    response.status(204).send()
  }
}
