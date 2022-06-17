export const replaceStyleInJs = (code: string, ext = '') => code.replace(/import.+\.(css|less)'/g, ext)

export const isScript = (suffix: string) => /\.(js|jsx|ts|tsx)/g.test(suffix)

export const isStyle = (file: string) => /\.(css|less)$/.test(file)

export const isJsx = (fileName: string) => /\.(jsx|tsx)/g.test(fileName)
