<template>
  <div class="register-login">
    <div class="main-area">
      <div class="main-area-content">
        <div class="centered">
          <h1 class="no-margin">{{$route.params.type[0].toUpperCase() + $route.params.type.slice(1)}}</h1>
          <p>{{ $route.params.type === 'register' ? 'Sign up' : 'Log in to Kanban Lite' }} to get access to your projects, boards and more.</p>
          <div class="form register" v-if="registerToggle">
            <input type="text" placeholder="First Name" name="firstname" v-model="firstname">
            <input type="text" placeholder="Last Name" name="lastname" v-model="lastname">
            <input type="text" placeholder="username" name="email" v-model="username">
            <input type="password" name="password" placeholder="password" v-model="password">
            <input type="password" name="confirm-password" placeholder="Confirm Password" @keyup="confirmPass($event)">
            <button class="btn" @click="register" :disabled="!validatePass">Register</button> or
            <button class="btn-alt" @click="setType">Login</button>
          </div>
          <div v-else class="form login">
            <input type="text" placeholder="username" name="email" v-model="username">
            <input type="password" name="password" placeholder="password" v-model="password">
            <button class="btn" @click="login">Login</button> or
            <button class="btn-alt" @click="setType">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'

export default {
  name: 'register',
  data () {
    return {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      validatePass: false,
      registerToggle: true
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.type === 'login' || to.params.type === 'register') {
      if (to.params.type === 'login') {
        next(vm => {
          vm.registerToggle = !vm.registerToggle
        })
      } else {
        next()
      }
    } else {
      next({
        name: 'error',
        path: '/404'
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.type === 'login') {
      this.registerToggle = false
      next()
    } else {
      next()
    }
  },
  mounted () {
    this.login()
  },
  methods: {
    confirmPass (e) {
      if (e.target.value === this.password) {
        this.validatePass = true
      } else {
        this.validatePass = false
      }
    },
    setType () {
      this.registerToggle = !this.registerToggle
      this.$router.push({
        name: 'Register',
        params: {
          type: this.registerToggle ? 'register' : 'login'
        }
      })
    },
    async register () {
      const response = await AuthenticationService.register({
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        password: this.password
      })
      if (response.data.success) {
        this.$router.push({
          name: 'Register',
          params: {
            type: 'login'
          }
        })
      }
    },
    async login () {
      const response = await AuthenticationService.login({
        username: this.username,
        password: this.password
      })
      console.log(response.data)
      if (response.data.success) {
        this.$router.push({
          name: 'Projects'
        })
      }
    }
  }
}
</script>

<style scoped>
  .no-margin{
    margin: 0;
  }
  .btn:disabled{
    opacity: 0.5;
  }
  .btn{
    background: #ff5747;
    padding: 15px 30px;
    color: #fff;
    border: 0;
    margin-top: 15px;
    font-size: 1.2rem;
  }
  .btn-alt{
    background: #0090ff;
    padding: 15px 30px;
    color: #fff;
    border: 0;
    margin-top: 15px;
    font-size: 1.2rem;
  }
  .bg-blue{
    position: relative;
    height: 100%;
    background: #0090ff;
  }
  .form input{
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    margin: 2.5% 0;
    border: 0;
    border-bottom: 1px solid #d1d1d1;
    font-size: 1.3rem;
  }
  .form input::placeholder{
    color: #b5b5b5;
  }
  .register-login{
    /*display: flex;*/
    height: 100%;
  }
  .register-login > div{
    height: 100%;
  }
  .sidebar{
    width: 30%;
  }
  .side-content{
    color: #fff;
    padding: 15px 30px;
  }
  .main-area{
    width: 100%;
    position: relative;
  }
  .main-area-content{
    position: absolute;
    top: 50%;
    width: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 10px 5px 0 rgba(0,0,0,0.5);
    padding: 30px;
    border: 1px solid lightgray;
  }
  .centered{

  }
</style>
