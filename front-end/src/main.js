import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/global.css';
import { router } from  './routes/index.js'
import { store } from './store';


createApp(App).use(router).use(store).mount('#app');
