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
			name
		})

		if (!store) {
			throw new AppError('Store not found.')
		}

		return store
	}
}

export default GetStoreService
