<template>
  <div>
    <el-header :seller="seller"></el-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import axios from "axios"
import header from "./components/header/header.vue"
const OK = 0
export default {
  data(){
    return {
      seller:{}
    }
  },
  created(){
    setTimeout(()=>{
      axios.get('/api2/seller').then(response=>{
        const result = response.data;
        if(result.code === OK ){
          this.seller = result.data;
          this.seller.scsore = 3.6
        }
      }
      )
      .catch((err)=>{
        console.log(err);
      })
    },1000)
  },
  components:{
    "el-header":header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    display flex
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex 1
      font-size 14px
      color:rgb(77,85,93)
      text-align center
      .activce
        color red
      

</style>
