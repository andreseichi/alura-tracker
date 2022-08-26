import { createApp } from 'vue';
import App from './App.vue';

import '@fortawesome/fontawesome-free/css/all.css';
import router from './routes';

import { store, key } from './store';

createApp(App).use(router).use(store, key).mount('#app');
