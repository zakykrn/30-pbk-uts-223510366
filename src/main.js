// src/main.js
import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(createPinia())
  .use(router)
  .mount('#app');
