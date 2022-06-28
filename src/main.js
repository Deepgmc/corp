import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import $auth from './plugins/auth/auth.plugin.js'


createApp(App)
    .use(store)
    .use(router)

    .use($auth)

    .mount('#corp')
