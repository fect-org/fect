import { createApp } from 'vue'
import Application from './application.vue'
import Fect from '@fect-ui/vue/src'
import Icon from '@fect-ui/vue-icons'
import router from './common/route'

import '@fect-ui/themes'
import './common/var.css'

createApp(Application).use(router).use(Fect).use(Icon).mount('#app')
