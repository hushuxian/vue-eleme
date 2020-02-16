<template>
  <div class="star" :class="`star-${size}`">
    <span class="star-item" :class="c" v-for="c in starClasses"></span>
  </div>
</template>
<script type="text/javascript">
  const CLASS_ON = 'on'
  const CLASS_HAFT = 'haft'
  const CLASS_OFF = 'off'

  export default {
    name: 'star',
    props:{
      score:Number,
      size:Number
    },
    computed:{
      starClasses(){
        const scs = []
        var score = this.score
        var scoreInterger = Math.floor(score)
        for(let i =0;i<scoreInterger;i++){
          scs.push(CLASS_ON)
        }
        if(score-scoreInterger >= 0.5){
          scs.push(CLASS_HAFT)
        }
        while(scs.length<5){
          scs.push(CLASS_OFF)
        }
        return scs
      }
    }
  };
</script>
<style type="text/css" lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .star-24
    .star-item
      display inline-block
      width 10px
      height 10px
      background-repeat no-repeat
      background-size 10px 10px
    .on
      bg-star(star24_on)
    .half
      bg-star(star24_half)
    .off
      bg-star(star24_off)
  .star-36
    .star-item
      display inline-block
      width 15px
      height 15px
      background-repeat no-repeat
      background-size 15px 15px
    .on
      bg-star(star36_on)
    .half
      bg-star(star36_half)
    .off
      bg-star(star36_off)
  .star-48
    .star-item
      display inline-block
      width 20px
      height 20px
      background-repeat no-repeat
      background-size 20px 20px
    .on
      bg-star(star48_on)
    .half
      bg-star(star48_half)
    .off
      bg-star(star48_off)

</style>