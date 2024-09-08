import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = '/api';

axios.defaults.headers.common['Authorization'] = `CustomToken ${localStorage.getItem('authToken')}`;

// Pračenje aktivnosti korisnika
export const userState = Vue.observable({
  isLoggedIn: !!localStorage.getItem("authToken"),
  userType: localStorage.getItem("userType") || null,
});

Vue.prototype.$userState = userState;

new Vue({
  router,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
