<template>
    <div class="project-wrap">
      <main-header></main-header>
      <div class="project-container">
        <h1 class="text-white text-light">My Projects</h1>
        <!--<router-link to="/projects/new">New Project</router-link>-->
        <div class="add-project-wrap">
          <div class="new-project" v-if="npToggle">
            <div class="new-project-container">
              <h3 class="no-margin">Add a new project</h3>
              <p>A board and list will be generated once you're in the project to get you started.</p>
              <input type="text" class="np-input" v-model="newProject.title" @keyup.enter="addProject">
              <button @click="addProject" class="delete">Add Project</button>
            </div>
          </div>
          <button @click="npToggle = !npToggle" class="add-project" :class="{on: npToggle}"><span class="sr-only">Add new</span></button>
        </div>
        <div class="project-grid">
          <router-link v-for="project in projects" :key="project.id" :to="{name:'Kanban', params:{title: project.title.toLowerCase().split(' ').join('-'), id: project._id}}" class="project-anchor">
            <div>
              <h3 class="no-margin project-title">{{project.title}}</h3>
              <small>{{project.lists.length}} {{project.lists.length > 1 ? 'boards' : 'board'}} in this project</small>
              <button class="delete-project" v-on:click.prevent="deleteProject(project._id)"><span class="sr-only">Delete Project</span>X</button>
            </div>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
import mainHeader from '../components/MainHeader'
import project from '../services/projectService'
export default {
  name: 'Projects',
  components: {
    mainHeader
  },
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
      console.log(this.projects)
      if (this.projects.length < 4) {
        this.npToggle = !this.npToggle
      }
    },
    async addProject () {
      const newProject = this.newProject
      const response = await project.newProject(newProject)
      if (response.data.success) {
        console.log(response.data)
        this.npToggle = !this.npToggle
        this.fetchProjects()
      }
    },
    async deleteProject (id) {
      const response = await project.deleteProject({
        id: id
      })
      console.log(response.data)
      this.fetchProjects()
    }
  }
}
</script>

<style scoped>
  .text-light{
    font-weight: 300;
  }
  .project-title{
    font-size: 1.35rem;
    font-weight: bold;
  }
  .text-white{
    color: #fff;
  }
  .no-margin{
    margin: 0;
  }
  .project-wrap{
    background: linear-gradient(royalblue, #0090ff);
    height: 100%;
  }
  .project-container{
    width: 75%;
    margin: 0 auto;
    margin-top: 30px;
  }
  .project-grid{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

  }
  .project-anchor{
    display: block;
    text-align: center;
    box-sizing: border-box;
    margin-bottom: 15px;
    background: #fff;
    padding: 20px;
    border-radius: 2.5px;
    text-decoration: none;
  }
  .project-anchor > div{
  }
  .project-grid > .project-anchor{
    width: 30%;
  }
  .project-grid > .project-anchor:nth-child(3n - 1){
    margin-left: 5%;
    margin-right: 5%;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }
  .add-project-wrap{
    position: absolute;
    bottom: 25px;
    right: 25px;
  }
  .add-project{
    width: 50px;
    height: 50px;
    border: 0;
    background: #fff;
    border-radius: 100%;
    box-shadow: 0 5px 8px rgba(0,0,0,0.25);
  }
  .add-project:after{
    content: '+';
    display: block;
    position: relative;
    top: -2px;
    font-size: 1.7rem;
    color: #ff5747;
    transition: 0.25s all;
  }
  .add-project.on:after{
    left: -2px;
    transform: rotate(-45deg);
  }
  .new-project{
    position: absolute;
    right: 75%;
    bottom: 100%;
    background: #fff;
    width: 250px;
    box-shadow: 0 5px 8px rgba(0,0,0,0.25);
    border-radius: 5px;
  }
  .new-project-container{
    padding: 20px;
  }
  .delete{
    background: #ff5747;
    border: 0;
    color: #fff;
    margin-top: 10px;
    padding: 5px 20px;
    font-size: 1rem;
  }
  .np-input{
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    margin: 2.5% 0;
    border: 0;
    border-bottom: 1px solid #d1d1d1;
  }
</style>
