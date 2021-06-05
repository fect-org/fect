const CAMELIZERE = /-(\w)/g

const camelize = (str: string): string =>
  str.replace(CAMELIZERE, (_, key) => key.toUpperCase())

export { camelize }
