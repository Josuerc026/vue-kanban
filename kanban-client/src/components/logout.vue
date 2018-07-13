<template>
    <div>
      <h1>Logout</h1>
    </div>
</template>

<script>
import AuthLogout from '../services/AuthenticationLogout'
export default {
  name: 'logout',
  data () {
    return {
      text: ''
    }
  },
  mounted () {
    this.logOut()
  },
  methods: {
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

</style>
