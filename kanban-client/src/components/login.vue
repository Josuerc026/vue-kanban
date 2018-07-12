<template>
  <div>
    <h1>Login</h1>
    <input type="text" placeholder="username" name="email" v-model="username">
    <input type="password" name="password" placeholder="password" v-model="password">
    <button @click="login">Register</button>
  </div>
</template>

<script>
import AuthServiceLogin from '../services/AuthenticationServiceLogin'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mounted () {
    this.login()
  },
  methods: {
    async login () {
      const response = await AuthServiceLogin.login({
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

</style>
