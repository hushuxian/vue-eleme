<template>

</template>
<script type="text/javascript">
  export default {
    name: 'component_name',
    data () {
      return {
      };
    },
    methods: {

    },
    created (){
      /*console.log(this.$axios({
              url:"/api2/goods",
              method:"get"
            }))*/
      console.log(new Promise((resolve,reject)=>{
          resolve(this.$axios({
              url:"/api2/goods",
              method:"get"
            }))
      }))
    }
  };
</script>
<style rel="stylesheet/stylus" lang="stylus" scoped>

</style>