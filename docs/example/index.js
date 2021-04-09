const context = require.context('./', true, /\.vue$/)

export default {
  install: (vue) =>
    context
      .keys()
      .map((path) => {
        const exampleModule = context(path)
        return exampleModule.default
      })
      .forEach((exModule) => {
        vue.component(exModule.name, exModule)
      }),
}
