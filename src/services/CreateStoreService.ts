import { Store, StoreModel } from '../mongoose/Store'

interface Request {
	name: string
}

class CreateStoreService {
	public async execute({ name }: Request): Promise<Store> {
		return await StoreModel.create({
			name
		})
	}
}

export default CreateStoreService
