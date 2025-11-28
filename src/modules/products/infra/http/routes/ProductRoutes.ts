import { Router } from 'express'
import ProductsController from '../controllers/ProductsController'
import { createProductSchema, idParamsValidation, updateProductSchema } from '../schemas/ProductSchemas'

const productsRouter = Router()
const productsController = new ProductsController()

productsRouter.get('/', productsController.index)
productsRouter.get('/:id', idParamsValidation, productsController.show)
productsRouter.post('/', createProductSchema, productsController.create)
productsRouter.put('/:id', updateProductSchema, productsController.update)
productsRouter.delete('/:id', idParamsValidation, productsController.delete)

export default productsRouter
