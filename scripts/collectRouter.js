const collectRoute = (context) => {
  return context.keys().map((p) => {
    const sourceName = p.match(/\w+(?=.md)/g).toString()
    const routeName = sourceName.charAt(0).toUpperCase() + sourceName.slice(1)
    return {
      path: `/${routeName}`,
      name: routeName,
      component: context(p).default,
    }
  })
}

export { collectRoute }
