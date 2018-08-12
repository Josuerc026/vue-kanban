<template>
  <div class="body">
    <div class="container w-container">
      <h1 class="heading">KANBAN LITE</h1>
      <div class="text-block">A lightweight kanban board application built with Vue.js</div>
      <div class="div-block">
        <div class="div-block-2"></div>
      </div><a href="https://www.klapp.josuearce.com/auth/register" class="register w-button">REGISTER</a><a href="https://www.klapp.josuearce.com/auth/login" class="link w-button">LOG IN</a>
    </div>
  <!-- [if lte IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script><![endif] -->
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Oswald:300,400,500');
  *{
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    cursor: pointer;
    color: #fff !important;
  }

  .container {
    position: static;
    display: block;
    margin-top: 135px;
    text-align: center;
  }

  .register {
    position: static;
    display: inline-block;
    margin-right: 6px;
    margin-left: 3px;
    padding: 15px 30px 15px 30px;
    float: none;
    clear: none;
    background-color: #4169e1;
    font-family: Oswald, sans-serif;
    font-size: 24px;
    text-align: center;
    transition: 0.4s all;
  }
  .register:hover{
    background: #184ce8;
  }
  .body {
    font-family: Oswald, sans-serif;
  }

  .heading {
    font-size: 56px;
    font-weight: bolder;
  }

  .div-block {
    width: 350px;
    height: 200px;
    margin: 25px auto;
    padding-top: 18px;
    background-image: url('../assets/window-empty.png');
    background-size: 350px 200px;
  }

  .video {
    display: block;
    height: 100px;
  }

  .div-block-2 {
    position: static;
    height: 100%;
    margin-top: 0px;
    padding-top: 0px;
    background-image: url('../assets/out.gif');
    background-position: 0px -14px;
    background-size: 100%;
  }

  .text-block {
    font-size: 24px;
  }

  .link {
    padding: 15px 30px 15px 30px;
    background-color: #ff5747;
    font-size: 24px;
    transition: 0.4s all;
  }
  .link:hover {
    background-color: #de2b1a;
  }
  @media (max-width: 479px) {
    .div-block {
      display: block;
      width: 77%;
      background-position: 50% -1%;
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: scroll;
    }
    .div-block-2 {
      display: block;
      background-size: auto 125%;
    }
  }
</style>
