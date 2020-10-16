import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/main/Index.vue'
import Message from '../views/main/Message.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      index: 1
    }
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: {
      index: 2
    }
  }
]

export default new VueRouter({
  routes
})
