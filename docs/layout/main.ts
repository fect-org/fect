import { createApp } from 'vue'
import Application from './application.vue'
import Fect from '@fect-ui/vue/src'
import Icon from '@fect-ui/vue-icons'
import router from './common/route'
import { createGlobalState } from './composables'
import { Playground, Preview } from './components/playground'
import Example from '../../example'
import '@fect-ui/themes'
import './common/var.css'

const createVueApp = () => {
  const globalState = createGlobalState()

  const app = createApp(Application)

  app.config.errorHandler = (err) => {
    globalState.setRenderError(err)
  }

  router.onError((err) => {
    console.log(err)
    globalState.setRenderError(err)
    console.log(err, 'router err main')
  })

  const baseTitlte = 'Vue - Fect UI'

  router.beforeEach((to, _, next) => {
    document.title = (to.meta?.title as string) || baseTitlte

    next()
  })

  app.use(router)
  app.use(Fect)
  app.use(Icon)
  app.use(globalState)
  app.use(Example)
  app.component(Playground.name, Playground)
  app.component(Preview.name, Preview)
  return { app, router }
}
const { app, router: _router } = createVueApp()

_router.isReady().then(() => app.mount('#app'))
