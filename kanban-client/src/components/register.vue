<template>
    <div>
        <h1>Register</h1>
        <input type="text" placeholder="email" name="email" v-model="email">
        <input type="password" name="password" placeholder="password" v-model="password">
        <button @click="register">Register</button>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<style scoped>

</style>
