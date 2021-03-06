<template>
    <header>
        <div class="container pos-relative">
            <div class="overflow-auto flex-between">
                <div class="logo">
                    <img src="https://cdn.onlinewebfonts.com/svg/img_561956.png" alt="kanban project">
                </div>
                <div class="item-count align-right">
                    <span>Happy {{ date }},
                      <button class="user-toggle" @click="userToggle = !userToggle">{{ firstname }}</button>!
                    </span>
                    <div class="user-info" v-if="userToggle">
                      <div class="user-icon">
                        {{renderNewFirst}}{{renderNewLast}}
                      </div>
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
  props: ['nameUpdated'],
  data () {
    return {
      firstname: '',
      lastname: '',
      username: '',
      date: new Date().toLocaleString('en-us', {
        weekday: 'long'
      }),
      userToggle: false
    }
  },
  watch: {
    nameUpdated (n, o) {
      if (n) {
        this.getUser()
      }
    }
  },
  mounted () {
    this.getUser()
  },
  computed: {
    renderNewFirst () {
      return this.firstname ? this.firstname[0].toUpperCase() : '?'
    },
    renderNewLast () {
      return this.lastname ? this.lastname[0].toUpperCase() : '?'
    }
  },
  methods: {
    async getUser () {
      const response = await User.getUser()
      let userInfo = {
        first: response.data.firstname,
        last: response.data.lastname,
        username: response.data.username
      }

      this.firstname = userInfo.first
      this.lastname = userInfo.last
      this.username = userInfo.username

      this.$emit('user-info', userInfo)
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
  .flex-between{
    display: flex;
    flex-flow: row;
    justify-content: space-between;
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
      height: 100%;
      padding: 5px 0;
  }
  .item-count{
      font-weight: bold;
      padding: 15px 0;
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
  .user-icon{
    width: 50px;
    height: 50px;
    text-align: center;
    margin: 0 auto;
    border-radius: 100%;
    background: royalblue;
    color: #fff;
    box-sizing: border-box;
    position: relative;
    padding: 15px;
    margin-top: 15px;
    font-weight: lighter;
    margin-bottom: 15px;
  }
</style>
