import { createVNode, defineComponent, inject, provide, reactive } from 'vue'
import { assign, omit, pick } from '@fect-ui/shared'
import { CONSTATNS } from './constants'
import type { App, DefineComponent, InjectionKey, ExtractPropTypes, UnwrapNestedRefs } from 'vue'

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
    type: [String, Number],
    default: CONSTATNS.width
  },
  w: {
    type: [String, Number],
    default: CONSTATNS.w
  },
  height: {
    type: [String, Number],
    default: CONSTATNS.height
  },
  h: {
    type: [String, Number],
    default: CONSTATNS.h
  },
  font: {
    type: [String, Number],
    default: CONSTATNS.font
  },
  margin: {
    type: [String, Number],
    default: CONSTATNS.margin
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
    type: [String, Number],
    default: CONSTATNS.padding
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

const isNumber = (val: unknown): val is number => {
  val = Number(val)
  return !Number.isNaN(val)
}
const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined'

const reduceScaleCoefficient = (scale: number) => {
  if (scale === 1) return scale
  const diff = Math.abs((scale - 1) / 2)
  return scale > 1 ? 1 + diff : 1 - diff
}

const modifers =
  (attrValue: string | number | undefined, { scale, unit }: { scale: number; unit: string }): ModifersPipe =>
  (baseScale, defaultValue) => {
    if (!baseScale) {
      baseScale = 1
      defaultValue = defaultValue || 0
    }
    const stand = reduceScaleCoefficient(scale) * baseScale
    if (isUndefined(attrValue)) {
      if (!isUndefined(defaultValue)) return `${defaultValue}`
      return `calc(${stand} * ${unit})`
    }
    if (!isNumber(attrValue)) return `${attrValue}`
    const userStand = stand * Number(attrValue)
    return `calc(${userStand} * ${unit})`
  }

export function withScale<T extends DefineComponent<any, any, any>>(userComponent: T) {
  const { name } = userComponent
  const component = defineComponent({
    name,
    props: scaleProps,
    setup(props, { slots, attrs }) {
      //

      createScaleContext({
        ...reactive({ unit: props.unit }),
        SCALES: reactive({
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
          width: modifers(props.paddingRight ?? props.pr ?? props.px ?? props.padding, {
            scale: props.scale,
            unit: props.unit
          }),
          height: modifers(props.width ?? props.w, {
            scale: props.scale,
            unit: props.unit
          }),
          font: modifers(props.font, {
            scale: props.scale,
            unit: props.unit
          })
        })
      })
      return () =>
        createVNode(
          userComponent,
          reactive(assign(omit(props, Object.keys(CONSTATNS) as Array<keyof typeof CONSTATNS>), attrs)),
          slots
        )
    }
  })

  component.install = (app: App) => {
    app.component(component.name, component)
  }

  return component as typeof component & T
}

export function useScale() {
  const presetScales = pick(CONSTATNS, [
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

  return inject(INTERNAL_SCALE_KEY, {
    unit: CONSTATNS.unit,
    SCALES: (Object.keys(presetScales) as Array<keyof typeof presetScales>).reduce((acc, cur) => {
      return assign(acc, { [cur]: modifers(CONSTATNS[cur], { scale: CONSTATNS.scale, unit: CONSTATNS.unit }) })
    }, {} as Record<keyof typeof presetScales, ModifersPipe>)
  })
}

function createScaleContext(scaleSystem: ScaleSystemContext) {
  provide(INTERNAL_SCALE_KEY, scaleSystem)
}
