import { model, Schema } from 'mongoose'

export interface Store {
	name: string
}

export const StoreSchema = new Schema<Store>({
	name: { type: String, required: true }
})

export const StoreModel = model<Store>('Store', StoreSchema)
