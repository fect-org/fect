const { Bundler } = require('./bundler')
const { PACKAGE_PATH } = require('./constant')

;(async () => {
  Bundler.cleanBuild()
  const bundler = new Bundler({
    entry: PACKAGE_PATH,
    mode: '', // todo  in future version , we will set it as a commonander
  })
  await bundler.run()
})()
