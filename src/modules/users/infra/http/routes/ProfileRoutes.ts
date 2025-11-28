import { Router } from 'express'
import ProfileController from '../controllers/ProfileController'
import { updateUserSchema } from '../schemas/UpdateUserSchema'
import AuthMiddleware from '@shared/middlewares/authMiddleware'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(AuthMiddleware.execute)
profileRouter.get('/', profileController.show)
profileRouter.patch('/', updateUserSchema, profileController.update)

export default profileRouter
