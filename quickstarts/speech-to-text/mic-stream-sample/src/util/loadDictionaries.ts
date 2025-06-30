import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { DictionaryContext } from '@protos/generated/yysystem/DictionaryContext'

export const loadDictionaryContexts = async (): Promise<DictionaryContext[]> => {
  try {
    const dictionaryPath = join(process.cwd(), 'dictionary.json')
    const dictionaryFile = await readFile(dictionaryPath, 'utf8')
    const dictionaryData = JSON.parse(dictionaryFile)
    console.info({logtag: 'loadDictionaryContexts', message: 'dictionaryData', dictionaryData: JSON.stringify(dictionaryData)})
    return dictionaryData as DictionaryContext[]
  } catch (error) {
    return []
  }
}