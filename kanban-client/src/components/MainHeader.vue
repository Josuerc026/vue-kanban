<template>
    <header>
        <div class="container pos-relative">
            <div class="overflow-auto">
                <div class="logo">
                    <img src="https://cdn.onlinewebfonts.com/svg/img_561956.png" alt="kanban project">
                </div>
                <div class="item-count align-right">
                    <span>Happy {{ new Date().toLocaleString('en-us', {  weekday: 'long' }) }},
                      <br>
                      <button class="user-toggle" @click="userToggle = !userToggle">{{ firstname }}</button>!
                    </span>
                    <div class="user-info" v-if="userToggle">
                      <img src="https://www.shareicon.net/data/128x128/2015/12/01/680532_face_512x512.png" width="50" height="50">
                      <p class="no-margin">{{ firstname }} {{ lastname }}</p>
                      <p class="no-margin">{{ username }}</p>
                      <button @click="logOut" class="log-out delete">Log out</button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import User from '../services/UserService'
import AuthLogout from '../services/AuthenticationLogout'
export default {
  name: 'mainHeader',
  props: ['itemCount'],
  data () {
    return {
      firstname: '',
      lastname: '',
      username: '',
      userToggle: false
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const response = await User.getUser()
      this.firstname = response.data.firstname
      this.lastname = response.data.lastname
      this.username = response.data.username
    },
    async logOut () {
      const response = await AuthLogout.logout()
      console.log(response.data)
      if (response.data.success) {
        this.$router.push({
          name: 'Register',
          params: {
            type: 'login'
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .pos-relative{
    position: relative;
  }
  .align-right{
    text-align: right;
  }
  .d-block{
    display: block;
  }
  .no-margin{
    margin: 0;
  }
  header{
      width: 100%;
      background: #fff;
      border-bottom: 3px solid royalblue;
  }
  .container{
      width: 75%;
      height: auto;
      margin: 0 auto;
      padding: 10px
  }
  .overflow-auto{
      overflow: auto;
  }
  .logo{
      float: left;
      height: 100%;
      padding: 5px 0;
  }
  .item-count{
      float: right;
      font-weight: bold;
      padding: 5px 0;
  }
  .item-count .item{
      font-size:1.2rem;
      color: #fff;
      display: block;
      background: black;
  }
  .logo img{
      width: 50px;
      height: auto;
  }
  .user-info{
    position: absolute;
    z-index: 999;
    background: #fff;
    padding: 10px 30px;
    text-align: center;
    top: calc(100% + 5px);
    color: #868282;
    right: 0;
    box-shadow: 0 5px 8px rgba(0,0,0,0.25);
    border-radius: 5px;
  }
  .user-toggle{
    background: none;
    border: none;
    text-decoration: underline;
    font-size: inherit;
    cursor: pointer;
    padding: 0;
  }
  .delete{
    background: #ff5747;
    border: 0;
    color: #fff;
    margin-top: 10px;
    padding: 5px 20px;
    font-size: 1rem;
  }
</style>
