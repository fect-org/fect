import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FectUI from '../packages'
import FectIcon from '@fect-ui/vue-icons'
import { PageComponents } from '../_page/install'
import Example from '../docs/example/index'
createApp(App)
  .use(router)
  .use(PageComponents)
  .use(FectUI)
  .use(FectIcon)
  .use(Example)
  .mount('#app')
