export const isScript = (suffix: string) => /\.(js|jsx|ts|tsx)/g.test(suffix)

export const isStyle = (file: string) => /\.(css|less)$/.test(file)

export const isJsx = (fileName: string) => /\.(jsx|tsx)/g.test(fileName)

export const slash = (path: string) => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path)
  if (isExtendedLengthPath) return path
  return path.replace(/\\/g, '/')
}

export const len = (tar: string | unknown[]) => tar.length
