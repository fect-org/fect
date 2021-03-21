import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import fay from '../packages'
createApp(App)
  .use(router)
  .use(fay)
  .mount('#app')
