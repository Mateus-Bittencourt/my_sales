import { Router } from 'express'
import { createOrderSchema, idParamsValidation } from '../schemas/OrdersSchemas'
import OrdersController from '../controllers/OrdersController'
import AuthMiddleware from '@shared/middlewares/authMiddleware'

const ordersRouter = Router()
const ordersController = new OrdersController()

ordersRouter.use(AuthMiddleware.execute)

ordersRouter.get('/:id', idParamsValidation, ordersController.show)
ordersRouter.post('/', createOrderSchema, ordersController.create)

export default ordersRouter
