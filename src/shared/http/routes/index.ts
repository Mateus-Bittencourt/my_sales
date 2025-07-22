import { Router } from 'express'

const routes = Router()

routes.get('/health', (_request, response) => response.json({ message: 'Server alive!' }))

export default routes
