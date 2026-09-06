import './globals.css'

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { clerkPlugin } from '@clerk/vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'
import { i18n } from './locales'

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(PiniaColada, {})
app.use(clerkPlugin, { publishableKey: CLERK_PUBLISHABLE_KEY })
app.use(router)

app.mount('#app')
