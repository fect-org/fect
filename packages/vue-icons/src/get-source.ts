import https from 'https'
import { join } from 'path'
import { remove } from 'fs-extra'

const sourcePath = join(__dirname, '..', 'sourcemap')

const ORIGIN = 'https://vercel.com/design/icons'

export const fetchDta = (): Promise<string> =>
  new Promise((resolve) =>
    https.get(ORIGIN, (res) => {
      let chunk: any = ''
      res.on('data', (data: any) => (chunk += data)).on('end', () => resolve(chunk))
    })
  )

export const getSVGSource = async () => {
  await remove(sourcePath)
  try {
    const res = await fetchDta()
    return res
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
