import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FectUI from '../packages'
import FectIcon from '@fect-ui/vue-icons'
createApp(App)
  .use(router)
  .use(FectUI)
  .use(FectIcon)
  .mount('#app')
