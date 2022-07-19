import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/css/bootstrap.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
.component('fa', FontAwesomeIcon)
.mount('#app')

import "bootstrap/dist/js/bootstrap.js"