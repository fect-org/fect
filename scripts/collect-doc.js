const fs = require('fs-extra')
const path = require('path')
const metaLocales = require('./locales')
const extractMetadata = require('extract-mdx-metadata')
const prefixDocPath = path.join(__dirname, '../docs/')
const testPath = path.join(__dirname, './a.json')
const weights = {
  guide: 1,
  components: 2,
}

const groupWeights = {
  快速上手: 1,
  通用: 2,
  数据展示: 3,
}

const getMetaData = async (files, parentPath) => {
  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(parentPath, file)
      const isDir = fs.statSync(filePath).isDirectory()
      if (isDir) {
        const children = await fs.readdir(filePath)
        const childrenMetaData = await getMetaData(children, filePath)
        const sorted = childrenMetaData.sort((a, b) => a.index - b.index)
        // sorting =>
        const childrenGroup = sorted.find((item) => item.group)
        if (childrenGroup) {
          const groups = [
            ...new Set(sorted.map((item) => item.group || 'others')),
          ]
          const groupChildren = groups
            .map((groupname) => ({
              name: groupname,
              children: sorted.filter(
                (item) => (item.group || 'others') === groupname,
              ),
            }))
            .sort((a, b) => {
              const pre = a.name.toLowerCase()
              const next = b.name.toLowerCase()
              return groupWeights[pre] - groupWeights[next]
            })
          return { name: file, children: groupChildren }
        }
        return childrenMetaData
      }
      const content = await fs.readFile(filePath, 'utf-8')
      const meta = await extractMetadata(content)
      const url = filePath.replace(prefixDocPath, '').replace('.mdx', '')
      return {
        name: meta.title || file,
        url,
        index: meta.index || 100,
        group: meta.group || null,
      }
    }),
  )
}

const deepFlatten = (metadata, locals) => {
  if (!metadata || !Array.isArray(metadata)) return metadata
  return metadata.map((data) => {
    if (typeof data !== 'object') return data
    if (data.children) {
      data.children = deepFlatten(data.children, locals)
    }
    const localeName = locals[data.name]
    if (!localeName) return data
    return {
      ...data,
      localeName,
    }
  })
}

;(async () => {
  try {
    const locales = await (await fs.readdir(prefixDocPath)).filter((name) => {
      const fullPath = path.join(prefixDocPath, name)
      return fs.statSync(fullPath).isDirectory()
    })
    const sortMetaData = await Promise.all(
      locales.map(async (name) => {
        const localName = metaLocales[name] || {}
        const dir = path.join(prefixDocPath, name)
        const childDirs = await fs.readdir(dir)
        const data = await getMetaData(childDirs, dir)
        const sorted = data.sort((a, b) => weights[a.name] - weights[b.name])
        const c = deepFlatten(sorted, localName)
        return {
          name,
          content: c,
        }
      }),
    )
    console.log(sortMetaData)
    await Promise.all(
      sortMetaData.map(async (data) => {
        await fs.ensureFile(testPath)
        await fs.writeJson(testPath, data.content)
      }),
    )
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
