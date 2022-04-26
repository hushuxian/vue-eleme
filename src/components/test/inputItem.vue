<template>
  <div>
    <el-input v-bind="$attrs" v-on="$listeners"></el-input>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'inputItem',
    data () {
      return {

      };
    },
    updated(){
      console.log(this.$attrs)
    },
    methods: {

    },
  };
</script>
<style rel="stylesheet/stylus" lang="stylus" scoped>

</style>