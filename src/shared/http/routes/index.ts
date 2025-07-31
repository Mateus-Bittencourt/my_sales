import productsRouter from '@modules/products/routes/ProductRoutes'
import usersRouter from '@modules/users/routes/UserRoutes'
import { Router } from 'express'

const routes = Router()

routes.get('/health', (_request, response) =>
  response.json({ message: 'Server alive!' })
)

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)

export default routes
