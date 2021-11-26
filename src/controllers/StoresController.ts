import { Request, Response } from 'express'
import CreateStoreService from '../services/CreateStoreService'
import GetStoreService from '../services/GetStoreService'

import GetStoresService from '../services/GetStoresService'

export default class StoresController {
	public async list(request: Request, response: Response): Promise<Response> {
		const getStoresService = new GetStoresService()

		const stores = await getStoresService.execute()

		return response.json(stores)
	}

	public async index(request: Request, response: Response): Promise<Response> {
		const { name } = request.params
		const getStoreService = new GetStoreService()

		const store = await getStoreService.execute({ name })

		return response.json(store)
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { name } = request.body
		const createStore = new CreateStoreService()

		const store = await createStore.execute({ name })

		return response.json(store)
	}
}
