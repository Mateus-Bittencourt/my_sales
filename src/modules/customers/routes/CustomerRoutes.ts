import { Router } from 'express'
import CustomersController from '../controllers/CustomersController'
import { createCustomerSchema, idParamsValidation, updateCustomerSchema } from '../schemas/CustomerSchemas'
import AuthMiddleware from '@shared/middlewares/authMiddleware'

const customersRouter = Router()
const customersController = new CustomersController()

customersRouter.use(AuthMiddleware.execute)
customersRouter.get('/', customersController.index)
customersRouter.get('/:id', idParamsValidation, customersController.show)
customersRouter.post('/', createCustomerSchema, customersController.create)
customersRouter.patch('/:id', updateCustomerSchema, customersController.update)
customersRouter.delete('/:id', idParamsValidation, customersController.delete)

export default customersRouter
