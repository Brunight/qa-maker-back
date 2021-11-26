import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'express-async-errors'
import AppError from './errors/AppError'

import uploadConfig from './config/upload'
import routes from './routes'
import mongoose from 'mongoose'
;(async () => {
	const app = express()

	app.use(cors())

	app.use(express.json())

	app.use('/files', express.static(uploadConfig.uploadsFolder))

	app.use(morgan('dev'))

	if (!process.env.MONGO_ATLAS_CONN_STR) return

	await mongoose.connect(process.env.MONGO_ATLAS_CONN_STR)

	app.use('/', routes)

	app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
		console.error(err)
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				status: 'error',
				message: err.message
			})
		}

		return response.status(500).json({
			status: 'error',
			message: 'Internal server error'
		})
	})

	app.listen(process.env.PORT || 3333, () => {
		console.log(`🚀 Server started on port ${process.env.PORT || 3333}!`)
	})
})()
