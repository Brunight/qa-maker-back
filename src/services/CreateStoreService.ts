import AppError from '../errors/AppError'
import { Store, StoreModel } from '../mongoose/Store'

interface Request {
	name: string
}

class CreateStoreService {
	public async execute({ name }: Request): Promise<Store> {
		const existingStore = await StoreModel.exists({
			name: { $regex: new RegExp(`^${name}$`, 'i') }
		})

		if (existingStore) {
			throw new AppError('Store already exists.')
		}

		return await StoreModel.create({
			name
		})
	}
}

export default CreateStoreService
