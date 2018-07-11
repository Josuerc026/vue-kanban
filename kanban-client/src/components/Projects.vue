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
      hello: ''
    }
  },
  methods: {
    async fetchProjects () {
      const response = await project.fetchProjects()
      console.log(response)
    }
    // async addProject () {
    //   const response = await project.newProject({
    //     project{
    //       title:
    //       board:{c
    //         title:
    //         item: {
    //           date:
    //           description:
    //           checkMigrate:
    //         }
    //         tasksRemaining:
    //         checkTitle:
    //       }
    //     }
    //   })
    //   console.log(response.data)
    // }
  }
}
</script>

<style scoped>

</style>
