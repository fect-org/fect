const fs = require('fs-extra')
const extractMetadata = require('extract-mdx-metadata')
const path = require('path')
const docsPath = path.join(__dirname, '../docs/zh-cn/components')
const routerPath = path.join(__dirname, '../src/router/index.js')

const getMetaData = async (files, parent_path) => {
  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(parent_path, file)
      const content = await fs.readFile(filePath, 'utf-8')
      const meta = await extractMetadata(content)
      const componentName = file.replace('.mdx', '')
      const url = filePath
        .replace(docsPath, '')
        .replace('.mdx', '')
        .replace(/\\/g, '/')
      return {
        name: meta.title || file,
        componentName,
        url,
        group: meta.group || null,
      }
    }),
  )
}

const routerTempalte = (routes) => {
  const routerPool = []
  const _templte = [
    'import { createRouter, createWebHistory } from \'vue-router\';\n',
  ]
  routes.map((route) => {
    routerPool.push({
      path: route.url,
      name: route.componentName,
      component: `${route.componentName}`,
    })
    _templte.push(
      `import ${route.componentName} from '../../docs/zh-cn/components/${route.componentName}.mdx';\n`,
    )
  })
  var reTemp = `${_templte.join('')}\n const routes=${JSON.stringify(
    routerPool,
  )};\n const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });\n export default router;`
  return reTemp
}

;(async () => {
  try {
    const docFiles = await fs.readdir(docsPath)
    const res = await getMetaData(docFiles, docsPath)
    const tar = await routerTempalte(res)
    await fs.writeFile(routerPath, tar)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
