import { Router } from 'express'
import AvatarsController from '../controllers/AvatarsController'
import multer from 'multer'
import uploadConfig from '@config/upload'
import AuthMiddleware from '@shared/middlewares/authMiddleware'

const avatarsRouter = Router()
const avatarsController = new AvatarsController()
const upload = multer(uploadConfig)

avatarsRouter.patch(
  '/',
  AuthMiddleware.execute,
  upload.single('avatar'),
  avatarsController.update
)

export default avatarsRouter
