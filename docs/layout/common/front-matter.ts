/**
 * Resolve markdown front matter info then generate route map
 */

export interface OrignalFrontMatter {
  title: string
  name: string
  group: string
  index?: number
}

const guideWeights = {
  快速上手: 1,
  定制化: 2
}

const componentWeights = {
  通用: 1,
  布局: 2,
  表面: 3,
  表单: 4,
  数据展示: 5,
  布告: 6,
  导航: 7
}

export const groupWeights = { ...guideWeights, ...componentWeights }
