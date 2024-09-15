import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;

axios.defaults.baseURL = "/api";

axios.defaults.headers.common[
  "Authorization"
] = `CustomToken ${localStorage.getItem("authToken")}`;

// Pračenje aktivnosti korisnika
export const userState = Vue.observable({
  isLoggedIn: !!localStorage.getItem("authToken"),
  userType: localStorage.getItem("userType") || null,
  userName: localStorage.getItem("username") || null,
});

Vue.prototype.$userState = userState;

new Vue({
  data: {
    userState: Vue.observable({
      isLoggedIn: false,
      userType: null,
      userName: null,
    }),
  },
  router,
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount("#app");

// Funkcija za postavljanje korisničkih podataka iz tokena nakon prijave
function userInfoFromToken(token) {
  const payload = JSON.parse(atob(token.split(".")[1]));
  localStorage.setItem("username", payload.username); // Pohrana korisničkog imena
  localStorage.setItem("userType", payload.userType); // Pohrana userType
  localStorage.setItem("authToken", token); // Pohrana tokena
  userState.isLoggedIn = true;
  userState.userType = payload.userType;
  userState.userName = payload.username; // Postavljanje username-a u userState
}

// setUserInfoFromToken() nakon prijave
export function loginUser(token) {
  userInfoFromToken(token);
}
