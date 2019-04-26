import Vue from 'vue'
import Router from 'vue-router'
import child from './router/child'

Vue.use(Router)

//路由
let routes = []

//添加各模块路由
child.forEach(obj => {
  routes.push(obj)
})

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
