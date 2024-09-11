import Vue from "vue";
import VueRouter from "vue-router";
import homepage from "../views/homepage.vue";
import login from "../views/login.vue";
import register from "../views/register.vue";
import seller from "../views/seller.vue";
import product from "../views/auctionGoods.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: homepage,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/seller",
    name: "seller",
    component: seller,
    beforeenter: (to, from, next) => {
      const token = localStorage.getItem("token");
      const userType = JSON.parse(atob(token.split('.')[1])).userType; // dekodiranje userType iz JWT
      if (token && userType === 'Prodavatelj') {
        next("/seller");
      } else {
        next("/");
      }
    },
  },
  {
    path: "/product",
    name: "product",
    component: product,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
