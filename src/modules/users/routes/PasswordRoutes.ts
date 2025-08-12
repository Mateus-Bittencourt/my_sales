import { Router } from 'express'
import SendForgotPasswordController from '../controllers/SendForgotPasswordController'
import ResetForgotPasswordController from '../controllers/ResetPasswordController'
import {
  ForgetPasswordSchema,
  ResetPasswordSchema,
} from '../schemas/PasswordSchemas'

const passwordRouter = Router()
const sendForgotPasswordController = new SendForgotPasswordController()
const resetForgotPasswordController = new ResetForgotPasswordController()

passwordRouter.post(
  '/forgot',
  ForgetPasswordSchema,
  sendForgotPasswordController.create
)
passwordRouter.post(
  '/reset',
  ResetPasswordSchema,
  resetForgotPasswordController.create
)

export default passwordRouter
