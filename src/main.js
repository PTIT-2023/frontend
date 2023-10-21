import { createApp } from 'vue'
import router from './router'
import store from './store'
import i18 from './i18n'
import App from './App.vue'

import './css/style.css'
import i18n from './i18n'

const app = createApp(App)

app.config.globalProperties.$filters = {
    toDateString(milliseconds) {
        return new Date(milliseconds).toDateString()
    }
}

app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
