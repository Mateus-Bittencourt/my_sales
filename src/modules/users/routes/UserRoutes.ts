import { Router } from 'express'
import UsersController from '../controllers/UsersControllers'
import { createUserSchema } from '../schemas/UserSchemas'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.index)
usersRouter.post('/', createUserSchema, usersController.create)

export default usersRouter
