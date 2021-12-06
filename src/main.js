import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import store from '@/store/index.js'
import './plugins/bootstrap-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import "bootswatch/dist/darkly/bootstrap.min.css";
import App from './App.vue' // app always last
import VueSweetalert2 from 'vue-sweetalert2';

const options = {
  confirmButtonColor: '#2384c6',
  cancelButtonColor: '#ff7674',
  background: '#303030'
};

Vue.use(VueSweetalert2, options)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
