import { Router } from 'express'
import StoresController from '../../controllers/StoresController'
import storePointsRouter from './points'

const storeRouter = Router({ mergeParams: true })

const storesController = new StoresController()

storeRouter.get('/', storesController.list)

storeRouter.get('/:name', storesController.index)

storeRouter.post('/', storesController.create)

storeRouter.use('/:storeId/points', storePointsRouter)

export default storeRouter
