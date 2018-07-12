<template>
    <div>
      <h1>Projects</h1>
    </div>
</template>

<script>
import project from '../services/projectService'
export default {
  name: 'Projects',
  data: function () {
    return {
      projects: ''
    }
  },
  mounted () {
    this.fetchProjects()
  },
  methods: {
    async fetchProjects () {
      const response = await project.fetchProjects()
      console.log(response.data.projects)
    }
  }
}
</script>

<style scoped>

</style>
