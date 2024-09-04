import Vue from 'vue'
import VueRouter from 'vue-router'
import homepage from '../views/homepage.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import welcome from '../views/welcome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: homepage
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: welcome,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (token) {
        next();
      } else {
        next('/login');
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
