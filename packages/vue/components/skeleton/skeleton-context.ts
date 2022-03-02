import { createProvider, useProvider } from '@fect-ui/vue-hooks'

import type { SkeletonContext } from './interface'

const READONLY_SKELETON_KEY = Symbol('skeletonKey')

export const createSkeletonContext = () => createProvider(READONLY_SKELETON_KEY)

export const useSkeletonContext = () => useProvider<SkeletonContext>(READONLY_SKELETON_KEY)
