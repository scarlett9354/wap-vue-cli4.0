import Vue from 'vue'
import App from '../views/App.vue'
import router from '../router/user'
import store from '../store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
