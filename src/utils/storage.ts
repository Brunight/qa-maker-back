import path from 'path'
import fs from 'fs'
import uploadConfig from '../config/upload'
import FormData from 'form-data'
import axios from 'axios'
import AppError from '../errors/AppError'

export async function deleteFile(file: string): Promise<void> {
	const filePath = path.resolve(uploadConfig.uploadsFolder, file)

	try {
		await fs.promises.stat(filePath)
	} catch {
		return
	}

	await fs.promises.unlink(filePath)
}

export async function uploadImgur(file: string): Promise<string> {
	const filePath = path.resolve(uploadConfig.tmpFolder, file)

	const newFile = fs.createReadStream(filePath)

	const formData = new FormData()

	formData.append('image', newFile)

	try {
		const response = await axios.post('https://api.imgur.com/3/upload', formData, {
			headers: {
				Authorization: 'Client-ID: e52a3cd5d1798a5',

				...formData.getHeaders()
			}
		})

		deleteFile(filePath)

		return response.data.data.link
	} catch (e) {
		throw new AppError('Error sending image to Imgur API.')
	}
}
