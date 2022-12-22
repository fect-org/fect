import { createVNode, defineComponent, inject, provide, reactive, watchEffect } from 'vue'
import { assign, omit, pick, isNumber } from '@fect-ui/shared'
import { CONSTATNS } from './constants'
import type { DefineComponent, InjectionKey, ExtractPropTypes, UnwrapNestedRefs } from 'vue'

type ScaleSystemContext = UnwrapNestedRefs<{ unit: string | undefined }> & {
  SCALES: Record<
    Extract<
      keyof typeof CONSTATNS,
      'pt' | 'pr' | 'pb' | 'pl' | 'px' | 'py' | 'mt' | 'mr' | 'mb' | 'ml' | 'mx' | 'my' | 'width' | 'height' | 'font'
    >,
    ModifersPipe
  >
}
const INTERNAL_SCALE_KEY: InjectionKey<ScaleSystemContext> = Symbol('ScaleRenderKey')

interface NumberProp {
  type: NumberConstructor
  default?: number
}

interface NumberOrStringProp {
  type: (NumberConstructor | StringConstructor)[]
  default?: string | number
}

interface StringProp {
  type: StringConstructor
  default?: string
}

const scaleProps: {
  [prop in keyof typeof CONSTATNS]: prop extends 'unit'
    ? Required<StringProp>
    : prop extends 'scale'
    ? Required<NumberProp>
    : NumberOrStringProp
} = {
  scale: {
    type: Number,
    default: CONSTATNS.scale
  },
  unit: {
    type: String,
    default: CONSTATNS.unit
  },
  width: {
    type: [String, Number]
  },
  w: {
    type: [String, Number]
  },
  height: {
    type: [String, Number]
  },
  h: {
    type: [String, Number]
  },
  font: {
    type: [String, Number]
  },
  margin: {
    type: [String, Number]
  },
  marginTop: {
    type: [String, Number]
  },
  marginRight: {
    type: [String, Number]
  },
  marginBottom: {
    type: [String, Number]
  },
  marginLeft: {
    type: [String, Number]
  },
  mt: {
    type: [String, Number]
  },
  mr: {
    type: [String, Number]
  },
  mb: {
    type: [String, Number]
  },
  ml: {
    type: [String, Number]
  },
  mx: {
    type: [String, Number]
  },
  my: {
    type: [String, Number]
  },
  padding: {
    type: [String, Number]
  },
  paddingTop: {
    type: [String, Number]
  },
  paddingRight: {
    type: [String, Number]
  },
  paddingBottom: {
    type: [String, Number]
  },
  paddingLeft: {
    type: [String, Number]
  },
  pt: {
    type: [String, Number]
  },
  pr: {
    type: [String, Number]
  },
  pb: {
    type: [String, Number]
  },
  pl: {
    type: [String, Number]
  },
  px: {
    type: [String, Number]
  },
  py: {
    type: [String, Number]
  }
}

export type ScaleProps = ExtractPropTypes<typeof scaleProps>

type ModifersPipe = (baseScale: number, defaultValue?: string | number) => string

function reduceScaleCoefficient(scale: number) {
  if (scale === 1) return scale
  const diff = Math.abs((scale - 1) / 2)
  return scale > 1 ? 1 + diff : 1 - diff
}

function modifers(
  attrValue: string | number | undefined,
  { scale, unit }: { scale: number; unit: string }
): ModifersPipe {
  return (baseScale, defaultValue) => {
    if (!baseScale) {
      baseScale = 1
      defaultValue = defaultValue || 0
    }
    const stand = reduceScaleCoefficient(scale) * baseScale
    if (typeof attrValue === 'undefined') {
      if (typeof defaultValue !== 'undefined') return `${defaultValue}`
      return `calc(${stand} * ${unit})`
    }
    if (!isNumber(attrValue)) return `${attrValue}`
    const userStand = stand * Number(attrValue)
    return `calc(${userStand} * ${unit})`
  }
}
const SCALES = pick(CONSTATNS, [
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'width',
  'height',
  'font'
])

const initScales = (scaleProps: ScaleProps) => {
  return {
    unit: scaleProps.unit,
    SCALES: (Object.keys(SCALES) as Array<keyof typeof SCALES>).reduce((acc, cur) => {
      return assign(acc, { [cur]: modifers(CONSTATNS[cur], { scale: CONSTATNS.scale, unit: CONSTATNS.unit }) })
    }, {} as Record<keyof typeof SCALES, ModifersPipe>)
  }
}

export function withScale<P extends Record<string, any>>(userComponent: DefineComponent<P, any, any>) {
  const { name } = userComponent
  return defineComponent({
    name,
    props: scaleProps as unknown as typeof scaleProps & P,
    setup(props: any, { slots, attrs }) {
      const scales = reactive(initScales(props))
      const updateSCALES = (): typeof scales => {
        return {
          unit: props.unit,
          SCALES: {
            pt: modifers(props.paddingTop ?? props.pt ?? props.py ?? props.padding, {
              scale: props.scale,
              unit: props.unit
            }),
            pr: modifers(props.paddingRight ?? props.pr ?? props.px ?? props.padding, {
              scale: props.scale,
              unit: props.unit
            }),
            pb: modifers(props.paddingBottom ?? props.pb ?? props.py ?? props.padding, {
              scale: props.scale,
              unit: props.unit
            }),
            pl: modifers(props.paddingLeft ?? props.pl ?? props.px ?? props.padding, {
              scale: props.scale,
              unit: props.unit
            }),
            px: modifers(props.px ?? props.paddingLeft ?? props.paddingRight ?? props.pl ?? props.pr ?? props.padding, {
              scale: props.scale,
              unit: props.unit
            }),
            py: modifers(props.py ?? props.paddingTop ?? props.paddingBottom ?? props.pt ?? props.pb ?? props.padding, {
              scale: props.scale,
              unit: props.unit
            }),
            mt: modifers(props.marginTop ?? props.mt ?? props.my ?? props.margin, {
              scale: props.scale,
              unit: props.unit
            }),
            mr: modifers(props.marginRight ?? props.mr ?? props.mx ?? props.margin, {
              scale: props.scale,
              unit: props.unit
            }),
            mb: modifers(props.marginBottom ?? props.mb ?? props.my ?? props.margin, {
              scale: props.scale,
              unit: props.unit
            }),
            ml: modifers(props.marginLeft ?? props.ml ?? props.mx ?? props.margin, {
              scale: props.scale,
              unit: props.unit
            }),
            mx: modifers(props.mx ?? props.marginLeft ?? props.marginRight ?? props.ml ?? props.mr ?? props.margin, {
              scale: props.scale,
              unit: props.unit
            }),
            my: modifers(props.my ?? props.marginTop ?? props.marginBottom ?? props.mt ?? props.mb ?? props.margin, {
              scale: props.scale,
              unit: props.unit
            }),
            width: modifers(props.width ?? props.w, {
              scale: props.scale,
              unit: props.unit
            }),
            height: modifers(props.height ?? props.h, {
              scale: props.scale,
              unit: props.unit
            }),
            font: modifers(props.font, {
              scale: props.scale,
              unit: props.unit
            })
          }
        }
      }
      watchEffect(() => assign(scales, updateSCALES()))
      createScaleContext(scales)
      return () =>
        createVNode(
          userComponent,
          reactive(assign(omit(props, Object.keys(CONSTATNS) as Array<keyof typeof CONSTATNS>), attrs)),
          slots
        )
    }
  })
}

export function useScale() {
  return inject(INTERNAL_SCALE_KEY, initScales(CONSTATNS))
}

function createScaleContext(scaleSystem: ScaleSystemContext) {
  provide(INTERNAL_SCALE_KEY, scaleSystem)
}
