import Vue from 'vue'
import VueRouter from 'vue-router'
import Calculate from '../views/Calculate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Calculate',
    component: Calculate,
  },
  {
    path: '/analyze',
    name: 'Analyze',
    component: () => import('../views/Analyze.vue')
  },
  {
    path: '/contribute',
    name: 'Contribute',
    component: () => import('../views/Contribute.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
