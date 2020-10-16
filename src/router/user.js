import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/user/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'User',
    component: User,
    meta: {
      index: 1
    }
  }
]

export default new VueRouter({
  routes
})
