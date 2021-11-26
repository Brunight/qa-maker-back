import AppError from '../errors/AppError'
import { StoreModel } from '../mongoose/Store'

interface Request {
	name: string
}

class GetStoreService {
	public async execute({ name }: Request): Promise<any> {
		if (!name) {
			throw new AppError('Store name was not provided.')
		}

		const store = await StoreModel.findOne({
			name: { $regex: new RegExp(`^${name}$`, 'i') }
		})

		if (!store) {
			throw new AppError('Store not found.', 404)
		}

		return store
	}
}

export default GetStoreService
