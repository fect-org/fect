import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FectUI from '../packages'
createApp(App)
  .use(router)
  .use(FectUI)
  .mount('#app')
