export const cleanUnsed = () => {
  return {
    name: 'non-plugin-clean-unsed',
    buildEnd(files: Map<string, any>) {
      files.forEach((item, key) => {
        const { content } = item
        if ((content as Buffer).length === 0) {
          files.delete(key)
        }
      })
    }
  }
}
