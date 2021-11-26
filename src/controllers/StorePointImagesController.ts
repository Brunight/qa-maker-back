/* eslint-disable prettier/prettier */
import { Request, Response } from 'express'
import { AddStorePointImageService } from '../services/AddStorePointImageService'

export default class StorePointImagesController {
	async update(request: Request, response: Response): Promise<Response> {
		const { pointId } = request.params
		const addStorePointImage = new AddStorePointImageService()

		const images = request.file
			? [request.file.filename]
			: request.files
				? (request.files as Express.Multer.File[]).map((file) => file.filename)
				: []

		const point = await addStorePointImage.execute({
			pointId,
			images
		})
		return response.json(point)
	}

	// public async create(request: Request, response: Response): Promise<Response> {}
}
