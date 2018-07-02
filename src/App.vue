<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <mainHeader :item-count="count"></mainHeader>
    <kanban v-on:list-count="listCount"></kanban>
  </div>
</template>

<script>
/* eslint-disable */
// import HelloWorld from './components/HelloWorld.vue'
import mainHeader from './components/MainHeader.vue'
import kanban from './components/kanban.vue'

export default {
  name: 'app',
  data: function(){
    return {
          count: 0
      }
  },
  components: {
      mainHeader,
      kanban
  },
  methods: {
    listCount: function(listLength){
      this.count = listLength;
    }
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding-bottom: 50px;
}
</style>
