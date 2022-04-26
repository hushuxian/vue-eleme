// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueScroller from "vue-scroller"
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import "./mock/mockServer"
import './common/stylus/fonts.styl'
import '@/lib/util.js'

Vue.use(ElementUI)
Vue.use(VueScroller)

Vue.filter('date-string',function(value){
  let date = new Date(value);
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
})
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
