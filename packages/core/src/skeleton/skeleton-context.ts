import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { InjectionKey } from 'vue'

import type { SkeletonContext } from './interface'

const READONLY_SKELETON_KEY: InjectionKey<SkeletonContext> = Symbol('skeletonKey')

export const createSkeletonContext = () => createProvider(READONLY_SKELETON_KEY)

export const useSkeletonContext = () => useProvider(READONLY_SKELETON_KEY)
