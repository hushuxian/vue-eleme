import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods.vue'
import ratings from '@/components/ratings/ratings.vue'
import seller from '@/components/seller/seller.vue'
import test from '@/components/test/index.vue'

Vue.use(Router)


export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      redirect:'/goods'
    },
    {
      path:'/goods',
      component:goods
    },
    {
      path:'/ratings',
      component:ratings
    },
    {
      path:'/seller',
      component:seller
    },
    {
      path:'/test',
      component:test
    }
  ]
})
