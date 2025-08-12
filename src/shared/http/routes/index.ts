import productsRouter from '@modules/products/routes/ProductRoutes'
import avatarsRouter from '@modules/users/routes/AvatarRoutes'
import sessionsRouter from '@modules/users/routes/SessionRoutes'
import usersRouter from '@modules/users/routes/UserRoutes'
import express, { Router } from 'express'
import uploadConfig from '@config/upload'
import passwordRouter from '@modules/users/routes/PasswordRoutes'

const routes = Router()

routes.get('/health', (_request, response) =>
  response.json({ message: 'Server alive!' })
)

routes.use('/sessions', sessionsRouter)
routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/avatars', avatarsRouter)
routes.use('/uploads', express.static(uploadConfig.directory))
routes.use('/password', passwordRouter)

export default routes
