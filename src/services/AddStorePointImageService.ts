import AppError from '../errors/AppError'
import { Point, PointModel } from '../mongoose/Point'
import { uploadImgur } from '../utils/storage'

interface IRequest {
	pointId: string
	images: string[]
}

export class AddStorePointImageService {
	public async execute({ pointId, images }: IRequest): Promise<Point> {
		if (!images || images.length === 0) {
			throw new AppError('No files added.', 401)
		}

		const point = await PointModel.findById(pointId)

		if (!point) {
			throw new AppError('Q.A point does not exist.', 401)
		}

		const filenames: string[] = []

		for (const image of images) {
			filenames.push(await uploadImgur(image))
		}
		console.log(filenames)

		point.images = [...new Set([...point.images, ...filenames])]

		await point.save()

		return point
	}
}
