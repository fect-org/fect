const { remove } = require('fs-extra')
const { Bundler } = require('./bundler')
const { cleanBuild } = require('./clean-build')
const { PACKAGE_PATH, TMP_PATH } = require('./constant')
const { setNodeEnv } = require('./constant')

;(async () => {
  await cleanBuild()
  setNodeEnv('production')
  const bundler = new Bundler({
    entry: PACKAGE_PATH,
    mode: 'esmodule',
  })
  await bundler.run()
  await remove(TMP_PATH)
})()
