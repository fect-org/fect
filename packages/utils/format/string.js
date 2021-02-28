const CAMELIZERE = /-(\w)/g

const camelize = (str) => str.replace(CAMELIZERE, (_, key) => key.toUpperCase())

export { camelize }
