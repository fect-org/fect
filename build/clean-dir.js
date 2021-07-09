const { remove } = require('fs-extra')

const { resolve } = require('path')

const ClibuildPath = resolve(__dirname, '.././tempo')

;(async () => {
  await remove(ClibuildPath)
})()
