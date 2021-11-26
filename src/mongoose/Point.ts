import { model, Schema, Types } from 'mongoose'

export enum PointStatus {
	DONE = 'done',
	NONE = 'none',
	IN_PROGRESS = 'in-progress',
	WAITING_INFO = 'waiting-info',
	UNABLE = 'unable'
}

export interface Point {
	store: Types.ObjectId
	title: string
	description: string
	images: string[]
	status: PointStatus
}

export const PointSchema = new Schema<Point>({
	store: { type: 'ObjectId', ref: 'Store' },
	title: { type: String, required: true },
	description: { type: String, required: true },
	images: [{ type: String, required: true }],
	status: { type: String, enum: PointStatus, default: PointStatus.NONE }
})

export const PointModel = model<Point>('Point', PointSchema)
