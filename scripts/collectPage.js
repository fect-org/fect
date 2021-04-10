const fs = require('fs-extra')
const extractMetadata = require('extract-mdx-metadata')
const path = require('path')
const docsPath = path.join(__dirname, '../docs/zh-cn')
const routerPath = path.join(__dirname, '../src/router/index.js')

const getMetaData = async (dirs, parent_path) => {
  /**
   * extractMetadata only use in async await
   */
  const retrans = (files, dirPath) => {
    return Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dirPath, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const meta = await extractMetadata(content)
        const componentName = file.replace('.mdx', '')
        const url = filePath.replace(docsPath, '').replace(/\\/g, '/')
        return {
          name: meta.title || file,
          componentName: componentName.replace(/\w/, (_) => _.toUpperCase()),
          url,
          group: meta.group || null,
        }
        // eslint-disable-next-line comma-dangle
      })
    )
  }

  return Promise.all(
    dirs.map(async (dir) => {
      const dirPath = path.join(parent_path, dir)
      const files = await fs.readdir(dirPath)
      const res = await retrans(files, dirPath)
      return res
    }),
  )
}

const routerTempalte = (routes) => {
  const PAHT_REG = /(\/).*(\/)/g
  const routerPool = [{ path: '/', redirect: { name: 'Introduce' } }]
  const _templte = [
    // eslint-disable-next-line quotes
    "import { createRouter, createWebHistory } from 'vue-router';\n",
  ]

  routes.map((route) => {
    routerPool.push({
      path: `/${route.url.replace(PAHT_REG, '').replace('.mdx', '')}`,
      name: route.componentName,
      component: route.componentName,
    })
    _templte.push(
      `const ${route.componentName}= () =>import('../../docs/zh-cn${route.url}');\n`,
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
    const soureData = await getMetaData(docFiles, docsPath)
    const tar = await routerTempalte(soureData.flat())
    await fs.writeFile(routerPath, tar)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
