/* eslint-disable prettier/prettier */
import { Router } from 'express'
import uploadConfig from '../../config/upload'
import multer from 'multer'
import { UploadImageService } from '../../services/UploadImageService'

const imagesRouter = Router({ mergeParams: true })
const upload = multer(uploadConfig.multer)

imagesRouter.post('/', upload.array('image'), async (request, response) => {
	const uploadImage = new UploadImageService()

	const images = request.file
		? [request.file.filename]
		: request.files
			? (request.files as Express.Multer.File[]).map((file) => file.filename)
			: []

	const imageLinks = await uploadImage.execute({
		images
	})
	return response.json(imageLinks)
})

export default imagesRouter
