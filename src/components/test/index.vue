<template>
  <div>
    qqqqq
    <my-table>
      <template v-slot:default="{phone}">
        <div>{{phone}}</div>
      </template>
      <template slot="foot" slot-scope="scope">
        <div>{{scope}}</div>
      </template>
    </my-table>
    <div>{{title}}</div>
    <input-item v-model="title"  @focus="doFocus"></input-item>
  </div>
</template>
<script type="text/javascript">
  import myTable from "./myTable"
  import inputItem from "./inputItem"
  export default {
    name: 'test',
    components:{
      myTable,
      inputItem
    },
    data () {
      return {
        title:""
      };
    },
    methods: {
      doInput(){
        console.log(this.title)
      },
      doFocus(){
        console.log("doFocus")
      }
    },
  };
</script>
<style rel="stylesheet/stylus" lang="stylus" scoped>

</style>