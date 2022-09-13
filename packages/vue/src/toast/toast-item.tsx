import { defineComponent, computed, watchEffect, Transition } from 'vue'

import { useState } from '@fect-ui/vue-hooks'
import { props } from './props'
import { createBem } from '../utils'
import type { ComputedRef } from 'vue'
import type { CSSProperties, PlaceTypes } from '../utils'

const bem = createBem('fect-toast')

/**
 * After ver 1.5.1 I decide use class replace inline style.
 * Because inline style isn't a good way. User can't define
 * their custom style. And in future i plan use jss replace all
 * style.
 */

// const getTranslate = (reverseIndex: number, onHover: boolean, total: number) => {
//   const calc = `100% + -75px + -${20 * reverseIndex}px`
//   if (reverseIndex >= 4) return `translate3d(0, -75px, -${reverseIndex}px) scale(.7)`
//   if (onHover) {
//     return `translate3d(0, ${reverseIndex * -75}px, -${reverseIndex}px) scale(${total === 1 ? 1 : 0.98205})`
//   }
//   return `translate3d(0, calc(${calc}), -${reverseIndex}px) scale(${1 - 0.05 * reverseIndex})`
// }

const getTranslateByPlacement = (placement: PlaceTypes) => {
  const translateEnter: Record<PlaceTypes, string> = {
    topLeft: 'translate(-60px, -60px)',
    topRight: 'translate(60px, -60px)',
    bottomLeft: 'translate(-60px, 60px)',
    bottomRight: 'translate(60px, 60px)'
  }
  const translateLeave: Record<PlaceTypes, string> = {
    topLeft: 'translate(-50px, 15px) scale(0.85)',
    topRight: 'translate(50px, 15px) scale(0.85)',
    bottomLeft: 'translate(-50px, -15px) scale(0.85)',
    bottomRight: 'translate(50px, -15px) scale(0.85)'
  }
  return {
    enter: translateEnter[placement],
    leave: translateLeave[placement]
  }
}

export default defineComponent({
  props,
  emits: ['cancel'],
  setup(props, { emit }) {
    const [visible, setVisible] = useState<boolean>(false)

    const [hidden, setHidden] = useState<boolean>(false)

    const reverseIndex = computed(() => props.total - (props.index + 1))

    watchEffect((onInvalidate) => {
      const timer = setTimeout(() => {
        setVisible(true)
        clearTimeout(timer)
      }, 10)
      onInvalidate(() => clearTimeout(timer))
    })

    watchEffect((onInvalidate) => {
      let unMount = false
      const shouldBeHide = reverseIndex.value > 2 || props.willBeDestroy
      if (!shouldBeHide || unMount) return
      const timer = setTimeout(() => {
        setHidden(true)
        clearTimeout(timer)
      }, 150)
      onInvalidate(() => {
        unMount = true
        clearTimeout(timer)
      })
    })

    const setToastClasses = computed(() => {
      const { placement } = props
      const position = []
      if (placement.toLocaleLowerCase().startsWith('top')) position.push('top')
      if (placement.toLocaleLowerCase().startsWith('left')) position.push('left')
      return position.reduce((acc, cur) => Object.assign(acc, { [cur]: true }), {})
    })

    const setToastTransition = computed(() => {
      const { enter, leave } = getTranslateByPlacement(props.placement)
      return {
        '--toast-transition-enter': enter,
        '--toast-transition-leave': leave
      } as CSSProperties
    })

    return () => {
      if (reverseIndex.value > 10) return null
      return (
        <Transition name="toast-fade" v-show={visible.value}>
          <div class={bem(null, [props.type, setToastClasses.value])} style={setToastTransition.value}>
            <div class={bem('message')}>{props.text}</div>
          </div>
        </Transition>
      )
    }
  }
})
