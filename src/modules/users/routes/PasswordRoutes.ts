import { Router } from 'express'
import SendForgotPasswordController from '../controllers/SendForgotPasswordController'
import ResetForgotPasswordController from '../controllers/ResetPasswordController'
import {
  forgetPasswordSchema,
  resetPasswordSchema,
} from '../schemas/PasswordSchemas'

const passwordRouter = Router()
const sendForgotPasswordController = new SendForgotPasswordController()
const resetForgotPasswordController = new ResetForgotPasswordController()

passwordRouter.post(
  '/forgot',
  forgetPasswordSchema,
  sendForgotPasswordController.create
)
passwordRouter.post(
  '/reset',
  resetPasswordSchema,
  resetForgotPasswordController.create
)

export default passwordRouter
