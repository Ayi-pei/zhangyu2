import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import RootComponent from './components/RootComponent.vue'
import router from './routes'

const app = createApp(RootComponent)
app.use(router)
app.use(ElementPlus)
app.mount('#app')