const context = require.context('./', true, /\.vue$/)
const exContext = require.context('!raw-loader!./', true, /\.vue$/)

const extractContext = (component, meta) => {
  const data = { _meta: () => meta }
  return Object.assign(component, data)
}

export default {
  install: (vue) =>
    context
      .keys()
      .map((path) => {
        const exampleModule = context(path)
        // return exampleModule.default
        return extractContext(exampleModule.default, exContext(path))
      })
      .forEach((exModule) => {
        vue.component(exModule.name, exModule)
      }),
}
