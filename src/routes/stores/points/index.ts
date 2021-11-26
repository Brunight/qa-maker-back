import { Router } from 'express'
import uploadConfig from '../../../config/upload'
import multer from 'multer'
import StorePointsController from '../../../controllers/StorePointsController'
import StorePointImagesController from '../../../controllers/StorePointImagesController'

const storePointsRouter = Router({ mergeParams: true })

const storePointsController = new StorePointsController()
const storePointImagesController = new StorePointImagesController()
const upload = multer(uploadConfig.multer)

storePointsRouter.get('/', storePointsController.list)

storePointsRouter.post('/', storePointsController.create)

storePointsRouter.put('/:pointId', storePointsController.update)

storePointsRouter.patch(
	'/:pointId/images',
	upload.array('image'),
	storePointImagesController.update
)

export default storePointsRouter
