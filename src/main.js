import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import vuetify from './plugins/vuetify'
import router from './router'
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App),
  store
}).$mount('#app')
