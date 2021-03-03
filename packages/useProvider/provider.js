import { reactive, provide } from 'vue'

/**
 *
 * @param {*} key  provider Key
 */
const useProvider = (key) => {
  const children = reactive([]) //save provide

  const provider = (value) => {
    provide(key, {
      children,
      ...value,
    })
  }

  return {
    children,
    provider,
  }
}

export { useProvider }
