import AppError from '../errors/AppError'
import { Point, PointModel, PointStatus } from '../mongoose/Point'

interface Request {
	pointId: string
	point: Partial<Omit<Point, 'images' | 'title'>>
}

export default class UpdateStorePointService {
	public async execute({ point, pointId }: Request): Promise<Point> {
		const existingPoint = await PointModel.findById(pointId)

		if (!existingPoint) {
			throw new AppError('Q.A point does not exist.', 401)
		}

		if (point.description) {
			existingPoint.description = point.description
		}

		if (point.status) {
			if (!(point.status.toUpperCase() in PointStatus)) {
				throw new AppError(
					// eslint-disable-next-line prettier/prettier
					'Valid status: \'DONE\', \'NONE\', \'IN_PROGRESS\', \'WAITING_INFO\' and \'UNABLE\''
				)
			}

			existingPoint.status = point.status.toLowerCase() as PointStatus
		}

		await existingPoint.save()

		return existingPoint
	}
}
