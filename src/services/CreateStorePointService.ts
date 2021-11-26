import AppError from '../errors/AppError'
import { Point, PointModel, PointSchema, PointStatus } from '../mongoose/Point'
import { Store, StoreModel } from '../mongoose/Store'

interface Request {
	storeId: string
	point: Partial<Omit<Point, 'store' | 'status'>>
}

class CreateStorePointService {
	public async execute({ storeId, point }: Request): Promise<Point> {
		const store = await StoreModel.findById(storeId)

		if (!store) {
			throw new AppError('Store does not exist.')
		}

		return await PointModel.create({
			store: store.id,
			title: point.title,
			description: point.description,
			images: point.images ?? [],
			status: PointStatus.NONE
		})
	}
}

export default CreateStorePointService
