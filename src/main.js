import { createApp } from 'vue'
import { loadFonts } from './plugins/webfontloader'


import App from './App.vue'
import vuetify from './plugins/vuetify'
import './assets/icon_font/styles.css';

loadFonts()

const app = createApp(App)
app.use(vuetify)

app.mount('#app')
