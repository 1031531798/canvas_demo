import { createApp } from 'vue'
import App from './App.vue'
import './style/common.scss'
import '@unocss/reset/normalize.css'
import CardBox from '@/components/cardBox/index.vue'
import 'uno.css'
const app = createApp(App)
app.component(
  'CardBox', CardBox
)
app.mount('#app')
