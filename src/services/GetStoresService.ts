import { Store, StoreModel } from '../mongoose/Store'

class GetStoresService {
	public async execute(): Promise<Store[]> {
		return StoreModel.find()
	}
}

export default GetStoresService
