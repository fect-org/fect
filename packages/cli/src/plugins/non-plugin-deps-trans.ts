import path from 'path'

export const transformDeps = () => {
  return {
    name: 'non-plugin-transform-deps',
    async buildEnd(files: Map<string, any>) {
      const { BABEL_ENV } = process.env
      const fileskeys = files.keys()
      for (const key of fileskeys) {
        const fileMeta = files.get(key)
        const { content, path: relativePath } = fileMeta
        const contentStr = content.toString()
        if (!/\.(json)/g.test(relativePath)) continue
        const data = JSON.parse(contentStr)
        const styleStr = Object.keys(data).reduce((acc, cur) => {
          if (data[cur]) {
            if (BABEL_ENV === 'commonjs') {
              acc += `require("${data[cur]}");\n`
            } else {
              acc += `import "${data[cur]}";\n`
            }
          }
          return acc
        }, '')
        const output = path.join(path.dirname(relativePath), 'style', 'index.js')
        files.set(key, { content: Buffer.from(styleStr), path: output })
      }
    }
  }
}
