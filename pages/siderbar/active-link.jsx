import { defineComponent, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const ActiveLink = defineComponent({
  props: {
    href: String,
    text: String,
  },
  setup(props) {
    const { href, text } = toRefs(props)
    const route = useRoute()
    const isActive = ref(false)
    watchEffect(() => (isActive.value = route.path === href.value))
    return () => (
      <div className={`link ${isActive.value ? 'active' : ''}`}>
        <FayLink to={href?.value}>{text?.value}</FayLink>
        <style jsx>{`
          .link {
            width: 100%;
            color: var(--accents-2);
            display: flex;
            height: 2.25rem;
            align-items: center;
            justify-content: flex-start;
            cursor: pointer;
            text-transform: capitalize;
          }
          .link.active {
            font-weight: 600;
            color: var(--geist-success-light);
          }
        `}</style>
      </div>
    )
  },
})

export default ActiveLink
