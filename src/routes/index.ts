import { Router } from 'express'
import storeRouter from './stores'
import imageRouter from './images'

const routes = Router()

routes.get('/', async (request, response) => {
	return response.send('E-Plus 💚')
})

routes.use('/stores', storeRouter)

routes.use('/images', imageRouter)

export default routes
