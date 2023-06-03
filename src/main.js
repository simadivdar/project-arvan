import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/js/bootstrap.bundle.js"
import "bootstrap/dist/css/bootstrap.min.css"
import DateFormat from "@voidsolutions/vue-dateformat"
const app=createApp(App)
app.use(router)
app.use(DateFormat)
app.mount('#app')
