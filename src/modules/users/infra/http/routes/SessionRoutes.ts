import { Router } from 'express'
import SessionsControllers from '../controllers/SessionsController'
import { createSessionSchema } from '../schemas/SessionSchema'

const sessionsRouter = Router()
const sessionsController = new SessionsControllers()

sessionsRouter.post('/', createSessionSchema, sessionsController.create)

export default sessionsRouter
