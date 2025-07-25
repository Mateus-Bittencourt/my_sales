import productsRouter from '@modules/products/routes/ProductRoutes'
import { Router } from 'express'

const routes = Router()

routes.get('/health', (_request, response) =>
  response.json({ message: 'Server alive!' })
)

routes.use('/products', productsRouter)

export default routes
