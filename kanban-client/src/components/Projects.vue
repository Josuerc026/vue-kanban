<template>
    <div>
      <h1>Projects</h1>
      <!--<router-link to="/projects/new">New Project</router-link>-->
      <button @click="npToggle = !npToggle">Add new</button>
      <div class="new-project" v-if="npToggle">
        <div class="new-project-container">
          <h3>Add a new project</h3>
          <p>Boards and lists will be generated once you're in the project</p>
          <input type="text" v-model="newProject.title" @keyup.enter="addProject">
          <button @click="addProject">Add Project</button>
        </div>
      </div>
      <router-link v-for="project in projects" :key="project.id" :to="{name:'Kanban', params:{title: project.title.toLowerCase().split(' ').join('-'), id: project.id}}">
        <h3>{{project.title}}</h3>
      </router-link>
    </div>
</template>

<script>
import project from '../services/projectService'
export default {
  name: 'Projects',
  data: function () {
    return {
      projects: [],
      npToggle: false,
      newProject: {
        title: '',
        board: {
          title: 'First Board (Edit me!)',
          item: {
            date: new Date().toLocaleDateString(),
            description: 'Project Board Item',
            checkMigrate: false
          },
          tasksRemaining: 0,
          checkTitle: false
        }
      }
    }
  },
  mounted () {
    this.fetchProjects()
  },
  methods: {
    async fetchProjects () {
      const response = await project.fetchProjects()
      this.projects = response.data.projects.projects
    },
    async addProject () {
      const newProject = this.newProject
      const response = await project.newProject(newProject)
      if (response.data.success) {
        console.log(response.data)
        this.npToggle = !this.npToggle
        this.fetchProjects()
      }
    }
  }
}
</script>

<style scoped>

</style>
