import { computed, defineComponent, ref } from 'vue'
import PaginationItem from './pagination-item'

const PaginationEllipsis = defineComponent({
  props: {
    isBefore: Boolean,
  },
  emits: ['click'],
  setup(props, { emit }) {
    /**
     * control show ellipsis or show arrow
     */
    const showMore = ref<boolean>(false)
    const setShowMore = (status: boolean) => (showMore.value = status)

    const getSVGClass = computed(() => {
      const className = ['more', 'before']
      if (props.isBefore) {
        return className.join(' ')
      }
      return className[0]
    })

    const handleClick = (e: Event) => {
      emit('click', e)
    }

    return () => (
      <PaginationItem
        onClick={handleClick}
        onMouseenter={() => setShowMore(true)}
        onMouseleave={() => setShowMore(false)}
      >
        {showMore.value ? (
          <svg
            class={getSVGClass.value}
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
            shape-rendering="geometricPrecision"
          >
            <path d="M13 17l5-5-5-5" />
            <path d="M6 17l5-5-5-5" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
            shape-rendering="geometricPrecision"
          >
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="19" cy="12" r="1" fill="currentColor" />
            <circle cx="5" cy="12" r="1" fill="currentColor" />
          </svg>
        )}
      </PaginationItem>
    )
  },
})

export default PaginationEllipsis
