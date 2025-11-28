import productsRouter from '@modules/products/infra/http/routes/ProductRoutes'
import avatarsRouter from '@modules/users/infra/http/routes/AvatarRoutes'
import sessionsRouter from '@modules/users/infra/http/routes/SessionRoutes'
import usersRouter from '@modules/users/infra/http/routes/UserRoutes'
import express, { Router } from 'express'
import uploadConfig from '@config/upload'
import passwordRouter from '@modules/users/infra/http/routes/PasswordRoutes'
import profileRouter from '@modules/users/infra/http/routes/ProfileRoutes'
import customersRouter from '@modules/customers/infra/http/routes/CustomerRoutes'
import ordersRouter from '@modules/orders/infra/http/routes/OrdersRoutes'

const routes = Router()

routes.get('/health', (_request, response) =>
  response.json({ message: 'Server alive!' })
)

routes.use('/sessions', sessionsRouter)
routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/avatars', avatarsRouter)
routes.use('/uploads', express.static(uploadConfig.directory))
routes.use('/passwords', passwordRouter)
routes.use('/profiles', profileRouter)
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)

export default routes
