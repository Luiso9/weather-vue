import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Create Pinia instance
const pinia = createPinia();

const app = createApp(App)

// Use Pinia
app.use(pinia);
app.use(router)

app.mount('#app')
