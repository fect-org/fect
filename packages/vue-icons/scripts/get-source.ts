const ORIGIN = 'https://vercel.com/design/icons'

export const getSVGSource = async () => {
  try {
    return (await fetch(ORIGIN)).text()
  } catch (error) {
    throw error
  }
}
