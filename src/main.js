import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FectUI from '../packages'
import FectIcon from '@fect-ui/vue-icons'
import { PageComponents } from '../_page/install'

createApp(App)
  .use(router)
  .use(PageComponents)
  .use(FectUI)
  .use(FectIcon)
  .mount('#app')
