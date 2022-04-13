import { createApp } from 'vue'
import App from './App.vue'
import './style/common.scss'
import CardBox from '@/components/cardBox/index.vue'
const app = createApp(App)
app.component(
  'CardBox', CardBox
)
app.mount('#app')