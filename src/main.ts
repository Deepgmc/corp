/** Vue default */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

// import 'bootstrap/dist/css/bootstrap.min.css'
 import 'bootstrap'

/** Plugins */
import $auth from './plugins/auth/auth.plugin'
import Notifications from '@kyvg/vue3-notification'
import Maska from 'maska'



createApp(App)

    /** Vue default */
    .use(store)
    .use(router)

    /** Plugins */
    .use($auth)
    .use(Notifications)
    .use(Maska)

    .mount('#corp')