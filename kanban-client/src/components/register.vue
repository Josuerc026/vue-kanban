<template>
    <div class="bg-blue">
      <div class="centered">
        <div class="form">
          <h1>Register</h1>
          <input type="text" placeholder="First Name" name="firstname" v-model="firstname">
          <input type="text" placeholder="Last Name" name="lastname" v-model="lastname">
          <input type="text" placeholder="username" name="email" v-model="username">
          <input type="password" name="password" placeholder="password" v-model="password">
          <button @click="register">Register</button>
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
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        password: this.password
      })
      if (response.data.success) {
        this.$router.push({
          name: 'Login'
        })
      }
    }
  }
}
</script>

<style scoped>
  .bg-blue{
    position: relative;
    height: 100%;
    background: linear-gradient(#10b0ff, #2f5bff);
  }
  .centered{
    position: absolute;
    width: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 5px 8px rgba(0,0,0,0.2);
  }
  .centered h1{
    margin: 0;
  }

</style>
