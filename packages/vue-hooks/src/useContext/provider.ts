import {
  VNode,
  isVNode,
  provide,
  reactive,
  getCurrentInstance,
  VNodeNormalizedChildren,
  ComponentPublicInstance,
  ComponentInternalInstance,
} from 'vue'

export const flattenVNodes = (children: VNodeNormalizedChildren) => {
  const result: VNode[] = []
  const traverse = (children: VNodeNormalizedChildren) => {
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

export const sortChildren = (
  parent: ComponentInternalInstance,
  publicChildren: ComponentPublicInstance[],
  internalChildren: ComponentInternalInstance[]
) => {
  const VNodes = flattenVNodes(parent.subTree.children)
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

export const createProvider = <
  T extends ComponentPublicInstance = ComponentPublicInstance
>(
  key: string | symbol
) => {
  const publicChildren: T[] = reactive([])
  const internalChildren: ComponentInternalInstance[] = reactive([])
  const parent = getCurrentInstance()!
  const provider = (value?: any) => {
    const link = (child: ComponentInternalInstance) => {
      if (child.proxy) {
        internalChildren.push(child)
        publicChildren.push(child.proxy as T)
        sortChildren(parent, publicChildren, internalChildren)
      }
    }

    const unlink = (child: ComponentInternalInstance) => {
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
