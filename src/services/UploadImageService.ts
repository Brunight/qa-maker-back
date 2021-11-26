import AppError from '../errors/AppError'
import { Point, PointModel } from '../mongoose/Point'
import { uploadImgur } from '../utils/storage'

interface IRequest {
	images: string[]
}

export class UploadImageService {
	public async execute({ images }: IRequest): Promise<string[]> {
		if (!images || images.length === 0) {
			throw new AppError('No files added.', 401)
		}
		console.log(images)

		const filenames: string[] = []

		for (const image of images) {
			filenames.push(await uploadImgur(image))
		}

		return filenames
	}
}
