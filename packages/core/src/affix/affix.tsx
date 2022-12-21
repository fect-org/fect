import { computed, defineComponent, ref } from 'vue'
import { useEventListener, useState } from '@fect-ui/vue-hooks'
import { assign } from '@fect-ui/shared'
import { createBem, createName, addUnit, getDomRect, getScrollTop, isHidden, convertUnitToPx } from '../utils'
import { props } from './props'
import type { AffixLayout } from './interface'

import './index.less'

const name = createName('Affix')

const bem = createBem('fect-affix')

export default defineComponent({
  name,
  props,
  emits: ['change', 'scroll'],
  setup(props, { slots, emit }) {
    const affixRef = ref<HTMLElement>()

    const [fixed, setFixed] = useState<boolean>(false)
    const [style, setStyle] = useState<AffixLayout>({ width: 0, height: 0 })

    const offset = computed(() => convertUnitToPx(props.offset))

    const scrollHandler = () => {
      if (!affixRef.value || isHidden(affixRef)) return
      const { position } = props
      const affixRect = getDomRect(affixRef)
      const scrollTop = getScrollTop(window)
      setStyle({
        width: affixRect.width,
        height: affixRect.height
      })
      if (position === 'top') {
        setFixed(() => offset.value > affixRect.top)
      }
      if (position === 'bottom') {
        const { clientHeight } = document.documentElement
        setFixed(() => clientHeight - offset.value < affixRect.bottom)
      }
      emit('scroll', {
        fixed: fixed.value,
        scrollTop
      })
    }

    const getAffixSize = () => {
      return {
        height: addUnit(style.value.height),
        width: addUnit(style.value.width)
      }
    }

    const setAffixStyle = computed(() => {
      if (!fixed.value) return
      const { zIndex, position } = props
      const _style = getAffixSize()

      if (zIndex) {
        assign(_style, {
          zIndex: +zIndex
        })
      }

      const setPosition = () => {
        const offsetPosition = offset.value ? addUnit(offset.value) : 0
        if (position === 'bottom') return { bottom: offsetPosition }
        return { top: offsetPosition }
      }

      assign(_style, setPosition())

      return _style
    })

    useEventListener('scroll', scrollHandler)

    const affixedPosition = () => {
      return {
        width: fixed.value ? addUnit(style.value.width) : undefined,
        height: fixed.value ? addUnit(style.value.height) : undefined
      }
    }

    return () => (
      <div ref={affixRef} class={bem(null)} style={affixedPosition()}>
        <div class={bem(null, { fixed: fixed.value })} style={setAffixStyle.value}>
          {slots.default?.()}
        </div>
      </div>
    )
  }
})
