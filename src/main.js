// Composables
import { createApp } from 'vue'
// Components
import App from './App.vue'
// Router
import router from './router'
// Stores
import pinia from './stores/index';
import { useMeStore } from './stores/me';
// Plugins
import { registerPlugins } from '@/plugins'
// Styles
import 'unfonts.css'
const app = createApp(App)
app.use(pinia)
const meStore = useMeStore();

registerPlugins(app)

meStore.getMe()
.catch(()=>{})
.finally(() => {
  app.use(router)
  app.mount('#app')
})

