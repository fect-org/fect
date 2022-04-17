import { computed, defineComponent, ref } from 'vue'
import { useEventListener, useState } from '@fect-ui/vue-hooks'
import { createBem, createName, addUnit, getDomRect, getScrollTop, isHidden } from '../utils'
import { props } from './props'
import type { AffixLayout } from './interface'
import type { DomRect } from '../utils'

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

    const offsetWithUnit = computed(() => addUnit(props.offset))

    const getOffset = () => {
      const { offset } = props
    }

    const preventScroll = () => {
      if (!affixRef.value) return
      if (isHidden(affixRef)) return
    }

    const scrollHandler = () => {
      preventScroll()
      const { target, position } = props
      const affixRect = getDomRect(affixRef)
      const targetRect = target?.getBoundingClientRect() as DomRect
      const scollTop = getScrollTop(window)

      setStyle({
        width: affixRect.width,
        height: affixRect.height
      })

      if (position === 'top') {
        if (target) {
          // const difference = targetRect.bottom-
        } else {
          setFixed(()=>)
        }
      }

      if (position === 'bottom') {
      }
      emit('scroll', {
        fixed: fixed.value,
        scrollTop: 0
      })
    }

    useEventListener('scroll', scrollHandler)

    return () => (
      <div ref={affixRef} class={bem(null)}>
        <div>{slots.default?.()}</div>
      </div>
    )
  }
})
