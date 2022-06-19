import * as Icons from '@fect-ui/vue-icons'

const getIcons = () => {
  return Object.keys(Icons).filter((v) => !['version', 'install', 'default'].includes(v))
}

export default getIcons()
