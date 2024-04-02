import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/global.css';
import { router } from  './routes/index.js'
import { store } from './store';
import { createNaverMap } from 'vue3-naver-maps';


createApp(App).use(router).use(store).use(createNaverMap, {
    clientId: "61fv4hv6dy",
    category: "ncp",
    subModules: [],
}).mount('#app');
