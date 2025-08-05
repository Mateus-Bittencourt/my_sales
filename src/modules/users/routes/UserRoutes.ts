import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import { createUserSchema } from '../schemas/UserSchemas'
import AuthMiddleware from '@shared/middlewares/authMiddleware'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', AuthMiddleware.execute, usersController.index)
usersRouter.post('/', createUserSchema, usersController.create)

export default usersRouter
