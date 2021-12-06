const path = import.meta.globEager('../../docs/en-us/components/*.md')
// const guide = import.meta.globEager('../../docs/en-us/guide/*.md')

import { collectRoute, RouteTempalte } from './basic-route'

// const guideRoutes = collectRoute(guide)

const compoentRoutes = collectRoute(path)

export const enRoutes = RouteTempalte(compoentRoutes, [], 'en-us')
