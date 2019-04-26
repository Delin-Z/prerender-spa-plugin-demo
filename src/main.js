import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() { // 添加mounted，不然不会执行预编译
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')