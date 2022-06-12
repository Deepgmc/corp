import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
//import $auth from './plugins/auth/auth.plugin.js'

createApp(App)
    .use(store)
    .use(router)
    //.use($auth)
    .mount('#corp')
