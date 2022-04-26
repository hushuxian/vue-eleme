<template>
  <div>
    <slot :phone="phone">
      <div>{{name}}</div>
    </slot>
    <slot name="foot" :foot="foot">
      <div>{{name}}</div>
    </slot>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'table',
    data () {
      return {
        name:"hi",
        phone:"111",
        foot:"foot"
      };
    },
    methods: {

    },
  };
</script>
<style rel="stylesheet/stylus" lang="stylus" scoped>

</style>