export const replaceStyleInJs = (code, ext = '') => code.replace(/import.+\.(css|less)'/g, ext)

export const isScript = (suffix) => /\.(js|jsx|ts|tsx)/g.test(suffix)

export const isStyle = (file) => /\.(css|less)$/.test(file)

export const isJsx = (fileName: string) => /\.(jsx|tsx)/g.test(fileName)
