const context = import.meta.globEager('./**/*.vue')

export default {
  install: (vue) =>
    Object.keys(context).map((meta) => {
      const data = context[meta].default
      vue.component(data.name, data)
    })
}
