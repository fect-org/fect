const { remove } = require('fs-extra')
const { CJS_PATH, ESM_PATH, TMP_PATH } = require('./constant')

const cleanBuild = () =>
  Promise.all([TMP_PATH, CJS_PATH, ESM_PATH].map((path) => remove(path)))

module.exports = { cleanBuild }
