import {config} from 'dotenv'

config()

export const yyapisApiKey = process.env.YYAPIS_API_KEY ?? ''
export const yyapisEndpoint = process.env.YYAPIS_ENDPOINT ?? ''
export const yyapisPort = process.env.YYAPIS_PORT ?? ''
export const yyapisSsl = process.env.YYAPIS_SSL === 'true' ? true : false
export const autoDetectLanguageCodes =
  (process.env.AUTO_DETECT_LANGUAGE_CODES ?? '')
    .split(',')
    .map(s => Number(s.trim()))
    .filter(n => !isNaN(n))
