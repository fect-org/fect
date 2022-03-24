export const isNumber = (val: any) => (Number.isNaN(Number(val)) ? false : true)

export const numberParser = (val: string) => Number.parseFloat(val)
