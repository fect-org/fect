const collectRoute = (context) => {
  return context.keys().map((p) => {
    const sourceName = p.match(/\w+(?=.md)/g)
    // eslint-disable-next-line prefer-destructuring
    const name = sourceName[0]
    const nameUper = name.charAt(0).toUpperCase() + name.slice(1)
    return { path: `/${name}`, name: nameUper, component: context(p).default }
  })
}

export { collectRoute }
