<template>
    <div class="project-wrap">
      <main-header v-on:user-info="getUserInfo" v-bind:nameUpdated="updatedName"></main-header>
      <div class="delete-popup" v-if="delCheck.toggle">
        <div class="delete-popup-content text-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Caution_icon_-_Noun_Project_9556_white.svg/1024px-Caution_icon_-_Noun_Project_9556_white.svg.png" class="prompt-img">
          <h3>Are you sure you want to delete "{{delCheck.name}}"?</h3>
          <div class="prompt-btns">
            <button @click="checkDelete(null,null, true)" class="prompt-btn">yes</button>
            <button @click="checkDelete(null,null, false)" class="prompt-btn">no</button>
          </div>
        </div>
      </div>
        <div class="project-container">
          <div class="project-flex-container">
            <div class="user-dash">
              <div class="user-content">
                <div class="user-icon">
                  {{user.first ? user.first[0] : '?' }}{{ user.last ? user.last[0].toUpperCase() : '?' }}
                </div>
                <br>
                <div>
                  <div v-if="!userToggles.name">
                    <div>{{user.first}} {{user.last ? user.last : '🤐'}} <button @click="userToggles.name = !userToggles.name">Edit</button></div>
                  </div>
                  <div v-else>
                    <input name="first" v-model="user.first" v-bind:placeholder="user.first"><input name="last" v-model="user.last" v-bind:placeholder="user.last"><button @click="updateName">Update</button><button @click="userToggles.name = !userToggles.name">Edit</button>
                  </div>
                  <br>
                  <div>{{user.username}} <button>Edit</button></div>
                </div>
              </div>
              <div class="pb-stats">
                <div class="project-stats">
                  <p><strong>{{projects.length}}</strong> Projects</p>
                </div>
                <div class="board-stats">
                  <p> <strong>{{totalBoards}}</strong> Boards</p>
                </div>
              </div>
            </div>
            <div class="project-dash">
              <h1 class="main-heading">My Projects</h1>
              <!--<router-link to="/projects/new">New Project</router-link>-->
              <div class="project-grid">
                <router-link v-for="project in projects" :key="project.id" :to="{name:'Kanban', params:{title: project.title.toLowerCase().split(' ').join('-'), id: project._id}}" class="project-anchor pos-relative">
                  <div>
                    <h3 class="no-margin project-title">{{project.title}}</h3>
                    <small class="project-details">{{project.lists.length}} {{project.lists.length > 1 ? 'Boards' : 'Board'}}</small>
                    <button class="delete-project" v-on:click.prevent="checkDelete(project._id, project.title)"><span class="sr-only">Delete Project</span>X</button>
                  </div>
                </router-link>
              </div>
              <div class="add-project-wrap">
                <div class="new-project" v-if="npToggle">
                  <div class="new-project-container">
                    <h3 class="no-margin">Add a new project</h3>
                    <p>A board and list will be generated once you're in the project to get you started.</p>
                    <input type="text" class="np-input" v-model="newProject.title" @keyup.enter="addProject" placeholder="Project Name">
                    <button @click="addProject" class="delete">Add Project</button>
                  </div>
                </div>
                <button @click="npToggle = !npToggle" class="add-project" :class="{on: npToggle}"><span class="sr-only">Add new</span></button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import mainHeader from '../components/MainHeader'
import project from '../services/projectService'
import User from '../services/UserService'

export default {
  name: 'Projects',
  components: {
    mainHeader
  },
  data: function () {
    return {
      projects: [],
      npToggle: false,
      updatedName: false,
      userToggles: {
        name: false,
        username: false
      },
      totalBoards: 0,
      user: {
        first: '',
        last: '',
        username: ''
      },
      delCheck: {
        toggle: false,
        name: '',
        id: ''
      },
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
    getUserInfo (user) {
      this.user.first = user.first
      this.user.last = user.last
      this.user.username = user.username
    },
    async updateName () {
      const response = await User.updateUser({
        firstname: this.user.first,
        lastname: this.user.last
      })
      if (response.data.success) {
        this.updatedName = true
      }
      this.userToggles.name = !this.userToggles.name
      setTimeout(() => {
        this.updatedName = false
      }, 500)
    },
    async fetchProjects () {
      const response = await project.fetchProjects()
      this.projects = response.data.projects.projects
      if (this.projects.length < 4) {
        this.npToggle = true
      }
      this.totalBoards = this.projects.reduce((acc, project) => {
        return acc + project.lists.length
      }, 0)
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
    checkDelete (id, name, check) {
      if (this.delCheck.id && this.delCheck.id && check) {
        this.deleteProject(this.delCheck.id)
        this.delCheck.toggle = !this.delCheck.toggle
      } else {
        this.delCheck.toggle = !this.delCheck.toggle
        this.delCheck.name = name
        this.delCheck.id = id
      }
    },
    async deleteProject (id) {
      const response = await project.removeProject(id)
      console.log(response.data)
      this.fetchProjects()
    }
  }
}
</script>

<style scoped>
  .project-flex-container{
    display: flex;
    flex-flow: row;
  }
  .project-flex-container > .user-dash{
    width: 20%;
    position: relative;
    border: 1px solid lightgray;
  }
  .user-content{
    text-align: center;
    padding: 0 25px;
  }
  .project-flex-container > .project-dash{
    width: 80%;
    padding: 0 25px;
    padding-bottom: 75px;
  }
  .pos-relative{
    position: relative;
  }
  .main-heading{
    margin-top: 0;
    margin-bottom: 30px;
  }
  .prompt-img{
    width: 50px;
    height: 50px;
    margin: 0 auto;
    display: block;
  }
  .text-center{
    text-align: center;
  }
  .text-light{
    font-weight: 300;
  }
  .project-title{
    font-size: 1.35rem;
    font-weight: normal;
    margin-bottom: 25px !important;
  }
  .text-white{
    color: #fff;
  }
  .no-margin{
    margin: 0;
  }
  .project-wrap{
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
    border: 1px solid lightgray;
  }
  .project-anchor:before{
    content: '';
    display: block;
    width: 100%;
    position: absolute;
    z-index: -1;
    top: 9px;
    right: -9px;
    height: 100%;
    background: #e4e4e4;
  }
  .project-anchor > div{
  }
  .project-grid > .project-anchor{
    width: 30%;
    margin-bottom: 15px;
  }
  .project-grid > .project-anchor:nth-child(3n - 1){
    margin-left: 5%;
    margin-right: 5%;
  }
  @media (max-width: 768px){
    .project-grid > .project-anchor{
      width: 100%;
    }
    .project-grid > .project-anchor:nth-child(3n - 1){
      margin-left: 0;
      margin-right: 0;
    }
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
    position: fixed;
    bottom: 25px;
    z-index: 999;
    right: 25px;
  }
  .add-project{
    width: 50px;
    height: 50px;
    border: 0;
    background: #ff5747;
    border-radius: 100%;
  }
  .add-project:after{
    content: '+';
    display: block;
    position: relative;
    top: -2px;
    font-size: 1.7rem;
    color: #fff;
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
    border: 1px solid lightgray;
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
    font-size: 1.15rem;
    border: 0;
    border-bottom: 1px solid #d1d1d1;
  }
  .delete-popup{
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 9999;
    left: 0;
    height: 100%;
    background: rgba(0,0,0,0.35);
    animation: prompt-open 0.4s;
  }
  .delete-popup-content{
    background: #ff5747;
    color: #fff;
    width: 350px;
    position: absolute;
    top: 50%;
    line-height: 25px;
    padding: 20px;
    z-index: 0;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .prompt-btns{
    margin-top: 10px;
  }
  .prompt-btn{
    border: 0;
    padding: 5px 15px;
    text-transform: uppercase;
    font-weight: bold;
  }
  .delete-project{
    position: absolute;
    top: -10px;
    left: -10px;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    color: #fff;
    border: 0;
    font-weight: bold;
    background: #ff5747;
    cursor: pointer;
  }
  .project-details{
    position: absolute;
    width: 100%;
    padding: 5px 0;
    display: block;
    left: 0;
    bottom: 0;
    background: royalblue;
    color: #fff;
  }
  .pb-stats{
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .pb-stats > div{
    flex: 1;
    background: lightgray;
    color: #737373;
    text-align: center;
  }
  .pb-stats > div > p > strong{
    display: block;
    font-size: 1.3rem;
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
  }
  @keyframes prompt-open{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
</style>
