const CAMELIZERE = /-(\w)/g

const camelize = (str) => str.replace(CAMELIZERE, '$1'.toUpperCase())

export { camelize }
