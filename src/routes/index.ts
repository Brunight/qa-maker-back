import { Router } from 'express'
import storeRouter from './stores'

const routes = Router()

routes.get('/', async (request, response) => {
	return response.send('E-Plus 💚')
})

routes.use('/stores', storeRouter)

export default routes
