const { Bundler } = require('./bundler')
const { cleanBuild } = require('./clean-build')
const { PACKAGE_PATH } = require('./constant')
const { setNodeEnv } = require('./constant')

;(async () => {
  await cleanBuild()
  setNodeEnv('production')
  const bundler = new Bundler({
    entry: PACKAGE_PATH,
    mode: '', // todo  in future version , we will set it as a commonander
  })
  await bundler.run()
})()
