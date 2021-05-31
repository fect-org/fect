import * as components from '../packages'

const install = (vue) => {
  const r = { ...components }
  if (!install.installed) {
    for (const idx in r) {
      r[idx].install(vue)
    }
  }
  return
}

export default { install }
