const zhContext = require.context('./zh-cn', true, /.\mdx$/)
const Type = require('./local')

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

const sortGroup = (source) => {
  const zhDocs = Type['zh-cn']
  const zhDocsKey = Object.keys(zhDocs)
  const zhDocsValue = []
  const gourpData = []
  for (const key of zhDocsKey) {
    zhDocsValue.push(zhDocs[key])
  }
  source.sort((a, b) => {
    return zhDocsValue.indexOf(a.group) - zhDocsValue.indexOf(b.group)
  })
  for (const key of zhDocsValue) {
    gourpData.push({
      name: key,
      children: source.filter((v) => v.group === key),
    })
  }
  return gourpData
}

const makeModules = (context) => {
  const chaosModule = context.keys().map((path) => {
    const mdModule = context(path)
    const metaModule = pickGroupName(mdModule.meta)
    return metaModule
  })
  return sortGroup(chaosModule)
}
const zhModule = makeModules(zhContext)

export default {
  'zh-cn': zhModule,
}
