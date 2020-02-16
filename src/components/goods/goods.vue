<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good,index) in goods" :class="{current:index === currentIndex}" @click="clickMenuItem(index,$event)">
            <span class="text border-1px">
              <span class="icon" v-if="good.type>=0" :class="classMap[good.type]"></span>{{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list food-list-hook" v-for="good in goods">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="food in good.foods" @click="clickFood(food,$event)">
                <div class="icon"><img width="57" height="57" :src="food.icon"></div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra"><span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></div>
                  <div class="price"><span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span></div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" :update-food-count="updateFoodCount"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :food-list="foodList" 
      :delivcery-price="seller.deliveryPrice" 
      :min-price="seller.minPrice" 
      :clear-cart="clearCart" 
      :update-food-count="updateFoodCount" ref="shopcart"></shopcart>
    </div>
    <food :food="selectFood" :update-food-count="updateFoodCount" ref="food"></food>
  </div>
</template>
<script type="text/javascript">
  import axios from 'axios'
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import shopcart from '../shopcart/shopcart.vue'
  import food from '../food/food.vue'

  const OK = 0;
  export default {
    props:['seller'],
    data () {
      return {
        goods:[],
        tops:[],
        scrollY:0,
        selectFood:{}
      };
    },
    created(){
      this.classMap = ['decrease','discount','special','invoice','guarantee']
      axios.get('/api2/goods').then((response)=>{
        const result = response.data;
        if(result.code === OK){
          this.goods = result.data;
          Vue.nextTick(()=>{
            this._initScroll()
            this._initTops()
          })
        }
      })
    },
    methods: {
      _initScroll(){
        /*new BScroll(this.$refs.menuWrapper,{click:true})*/
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
          probeType:3,
          click:true
        })
        this.foodsScroll.on('scroll',pos=>{
          this.scrollY = Math.abs(pos.y)
        })
      },
      _initTops(){
        var tops = this.tops
        var top = 0
        tops.push(top)
        var lis = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
          [].slice.call(lis).forEach(li=>{
            top += li.clientHeight
            tops.push(top)
          })
      },
      updateFoodCount(food,isAdd,event){
       /*if(!event._constructed){
          return
        }*/
        if(isAdd){
          if(!food.count){
            Vue.set(food,'count',1) 
          }else{
            food.count++
          }
          this.$refs.shopcart.drop(event.target)
        }else{
          if(food.count){
            food.count--
          }
        }
      },
      clickMenuItem(index,event){
        /*if(!event._constructed){
          return
        }*/
        var li = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')[index]
        this.foodsScroll.scrollToElement(li,300)
      },
      clearCart(){
        this.foodList.forEach(food =>{
          food.count = 0
        })
      },
      clickFood(food,event){
        if(!event._construceted){
          return
        }

        this.selectFood = food
        this.$refs.food.show(true)
      }

    },
    components:{
      cartcontrol,
      shopcart,
      food
    },
    computed:{
      currentIndex(){
        const {tops,scrollY} = this
        return tops.findIndex((top,index) =>{
          return scrollY >= top && scrollY < tops[index+1]
        })
      },
      foodList(){
        const foods = []
        this.goods.forEach(good =>{
          good.foods.forEach(food=>{
            if(food.count){
              foods.push(food)
            }
          })
        })
        return foods
      }
    }
  };
</script>
<style type="text/css" lang="stylus">
  @import "../../common/stylus/mixins.styl"
  
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
</style>