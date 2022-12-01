import https from 'https'
import { join } from 'path'
import { fs } from 'internal'

const sourcePath = join(__dirname, '..', 'sourcemap')

const ORIGIN = 'https://vercel.com/design/icons'

export const fetchData = (): Promise<string> =>
  new Promise((resolve) =>
    https.get(ORIGIN, (res) => {
      let chunk: any = ''
      res.on('data', (data: any) => (chunk += data)).on('end', () => resolve(chunk))
    })
  )

export const getSVGSource = async () => {
  await fs.remove(sourcePath)
  try {
    const res = await fetchData()
    return res
  } catch (error) {
    throw error
  }
}
