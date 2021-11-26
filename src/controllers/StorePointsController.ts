import { Request, Response } from 'express'
import CreateStorePointService from '../services/CreateStorePointService'
import GetStorePointsService from '../services/GetStorePointsService'
import UpdateStorePointService from '../services/UpdateStorePointService'

export default class StorePointsController {
	public async list(request: Request, response: Response): Promise<Response> {
		const { storeId } = request.params
		const getStorePoints = new GetStorePointsService()

		const points = await getStorePoints.execute({ storeId })

		return response.json(points)
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { storeId } = request.params
		const { title, description, images } = request.body
		const createStorePoint = new CreateStorePointService()

		const point = await createStorePoint.execute({
			storeId,
			point: {
				description,
				title,
				images
			}
		})

		return response.json(point)
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { pointId } = request.params
		const { description, status } = request.body

		const updateStorePoint = new UpdateStorePointService()
		const point = await updateStorePoint.execute({
			pointId,
			point: {
				description,
				status
			}
		})

		return response.json(point)
	}
}
