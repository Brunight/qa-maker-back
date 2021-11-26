import axios from 'axios'
import mercadopagoSdk from 'mercadopago'

const access_token = process.env.MERCADO_PAGO_ACCESS_TOKEN

if (!access_token) throw new Error('Mercado Pago Access Token not provided in environment.')

mercadopagoSdk.configure({
	access_token
})

export const mercadopago = mercadopagoSdk

export const mercadopagoApi = axios.create({
	baseURL: 'https://api.mercadopago.com/',
	headers: {
		authorization: `Bearer ${access_token}`
	}
})
