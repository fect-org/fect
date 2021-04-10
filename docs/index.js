const zhContext = require.context('./zh-cn', true, /.\mdx$/)

const pickGroupName = (meta) => {
  const ROUTE_REG = /(\w)+/g
  const result = {}
  const source = meta.route
  result.title = meta.title
  result.group = meta.group
  if (source) {
    result.route = { name: meta.route }
  } else {
    // eslint-disable-next-line prefer-destructuring
    const route = meta.title.match(ROUTE_REG)[0]
    result.route = { name: route }
  }
  return result
}

const makeModules = (context) => {
  return context.keys().map((path) => {
    const mdModule = context(path)
    const metaModule = pickGroupName(mdModule.meta)
    return metaModule
  })
}

const zhModule = makeModules(zhContext)

export default {
  'zh-cn': zhModule,
}
