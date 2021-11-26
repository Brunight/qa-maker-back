import { Router } from 'express'
import GetStoresService from '../../services/GetStoresService'
import GetStoreService from '../../services/GetStoreService'
import StoresController from '../../controllers/StoresController'

const storeRouter = Router()

const storesController = new StoresController()

storeRouter.get('/', storesController.list)

storeRouter.get('/:name', storesController.index)

storeRouter.post('/', storesController.create)

export default storeRouter
