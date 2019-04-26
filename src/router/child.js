import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const children = [
  {
    path: 'home',
    name: '首页',
    component: () => import('@/views/child/home.vue')
  },
  {
    path: 'about',
    name: '关于',
    component: () => import('@/views/child/about.vue')
  }
]

const router = [
  {
    path: '/',
    name: '产品',
    component: () => import('@/views/index'),
    children: children
  }
]
export default router
