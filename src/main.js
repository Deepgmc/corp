/** Vue default */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

/** Plugins */
import $auth from './plugins/auth/auth.plugin.js'
import Notifications from '@kyvg/vue3-notification'



createApp(App)

    /** Vue default */
    .use(store)
    .use(router)

    /** Plugins */
    .use($auth)
    .use(Notifications)

    .mount('#corp')
