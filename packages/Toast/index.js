import Toast from './serve'
import FectToast from './toast'
Toast.install = (vue) => {
  vue.use(FectToast)
  vue.config.globalProperties.$toast = Toast
}

export default Toast
