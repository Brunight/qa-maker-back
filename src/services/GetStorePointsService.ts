import AppError from '../errors/AppError'
import { PointModel } from '../mongoose/Point'
import { StoreModel } from '../mongoose/Store'

interface Request {
	storeId: string
}

class GetStorePointsService {
	public async execute({ storeId }: Request): Promise<any> {
		const store = await StoreModel.findById(storeId)

		if (!store) {
			throw new AppError('Store not found.', 404)
		}

		const points = await PointModel.find({
			store: store.id
		})

		return points
	}
}

export default GetStorePointsService
