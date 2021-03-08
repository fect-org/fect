import { reactive, provide, isVNode, getCurrentInstance } from 'vue'

function flattenVNodes(children) {
  const result = []
  const traverse = (children) => {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (isVNode(child)) {
          result.push(child)
          if (child.component?.subTree) {
            traverse(child.component.subTree.children)
          }
          if (child.children) {
            traverse(child.children)
          }
        }
      })
    }
  }
  traverse(children)
  return result
}

function sortChildren(parent, publicChildren, internalChildren) {
  // parent.subTree.children  save all virtual nodes
  const VNodes = flattenVNodes(parent.subTree.children)
  // children node self
  internalChildren.sort(
    // eslint-disable-next-line comma-dangle
    (a, b) => VNodes.indexOf(a.vnode) - VNodes.indexOf(b.vnode)
  )
  const orderedPublicChildren = internalChildren.map((item) => item.proxy)
  publicChildren.sort((a, b) => {
    const indexA = orderedPublicChildren.indexOf(a)
    const indexB = orderedPublicChildren.indexOf(b)
    return indexA - indexB
  })
}

/**
 *
 * @param {*} key  provider Key
 */
const createProvider = (key) => {
  const publicChildren = reactive([]) // proxy
  const internalChildren = reactive([]) //private
  const parent = getCurrentInstance()

  const provider = (value) => {
    const link = (child) => {
      if (child.proxy) {
        internalChildren.push(child)
        publicChildren.push(child.proxy)
        sortChildren(parent, publicChildren, internalChildren)
      }
    }

    const unlink = (child) => {
      const idx = internalChildren.indexOf(child)
      publicChildren.splice(idx, 1)
      internalChildren.splice(idx, 1)
    }
    provide(key, {
      link,
      unlink,
      children: publicChildren,
      internalChildren,
      ...value,
    })
  }
  return {
    children: publicChildren,
    provider,
  }
}

export { createProvider }
