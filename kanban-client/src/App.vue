<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  margin: 0;
  height: 100%;
  font-size: 16px;
}
@import url('https://fonts.googleapis.com/css?family=Muli:300,400,600');
#app {
  font-family: 'Muli',  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  height: 100%;
}
*{
  box-sizing: border-box;
}
</style>
