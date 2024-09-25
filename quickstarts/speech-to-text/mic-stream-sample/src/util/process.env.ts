import {config} from 'dotenv'

config()

export const yyapisApiKey = process.env.YYAPIS_API_KEY ?? ''
export const yyapisEndpoint = process.env.YYAPIS_ENDPOINT ?? ''
export const yyapisPort = process.env.YYAPIS_PORT ?? ''
export const yyapisSsl = process.env.YYAPIS_SSL === 'true' ? true : false
