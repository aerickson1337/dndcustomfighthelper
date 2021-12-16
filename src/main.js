import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import store from '@/store/index.js'
import './plugins/bootstrap-vue'
import "bootswatch/dist/darkly/bootstrap.min.css";
import App from './App.vue' // app always last
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
