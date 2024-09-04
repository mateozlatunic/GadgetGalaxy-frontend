import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = '/api';

axios.defaults.headers.common['Authorization'] = `CustomToken ${localStorage.getItem('token')}`;

new Vue({
  router,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
