<template>
  <div>
    <main-header></main-header>
    <div class="container">
      <router-link to="/projects">Back to Projects </router-link>
      <h1>{{projectTitle}}</h1>
      <div class="kanban-wrap">
        <form v-on:submit.prevent="addTask($event)">
          <fieldset>
            <div class="task-inputs">
              <input type="text" v-model="userTask" autocomplete="true" placeholder="Add Task..." class="ni-input">
              <select ref="formSelect" class="select-board">
                <option v-for="(koptions, index) in lists" :key="koptions.id" :id="index">{{koptions.title}}</option>
              </select>
              <button type="submit" class="add-task">Add task</button>
            </div>
            <div class="board-inputs">
              <button type="button" @click="addBoard" class="add-board">Add Board</button>
            </div>
          </fieldset>
        </form>
        <div class="kanban-container">
          <div class="kanban" v-for="(kanban, index) in lists" :key="kanban.id">
            <div class="kanban-task-count" v-bind:class="{
                        warning: (kanban.todoList.length > 4) && (kanban.todoList.length < 7),
                        caution: (kanban.todoList.length >= 7)
                    }">
              <span>{{kanban.todoList.length}}</span>
            </div>
            <div v-if="kanban.checkTitle" class="edit-title">
              <input type="text" v-model="kanban.title">
              <button @click="editTitle(kanban)" class="edit">done</button>
            </div>
            <h3>
              {{kanban.title}}
              <div>
                <button @click="editTitle(kanban)" class="edit">edit</button>
                <button @click="removeBoard(index)" class="delete">Delete</button>
              </div>
            </h3>
            <ul>
              <li v-for="(item, index) in kanban.todoList" :key="item.id" class="list-item">
                <div class="item-content">
                  <p>{{item.description}}</p>
                  <div class="item-group">
                    <small class="item-date">{{item.date}}</small>
                    <div class="btn-group-right">
                      <button @click="migrateTask(item, null)" class="edit">Move</button>
                      <button @click="removeTask(kanban, index)" class="delete">Delete</button>
                    </div>
                  </div>
                  <div v-if="item.checkMigrate">
                    <select @change="moveTask($event,kanban,item, index)">
                      <option>Select Board</option>
                      <option v-for="(koptions, index) in lists" :key="koptions.id" :id="index">{{koptions.title}}</option>
                    </select>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="isSaved.check" class="saved-prompt">
          <h3>{{isSaved.msg}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainHeader from '../components/MainHeader'
import project from '../services/projectService'
export default {
  name: 'kanban',
  components: {
    mainHeader
  },
  data: function () {
    return {
      setWarning: false,
      setAlert: false,
      userTask: '',
      projectTitle: '',
      isSaved: {
        message: '',
        check: false
      },
      lists: []
    }
  },
  computed: {

  },
  mounted () {
    console.log(this.$route.params)
    this.getBoards()
  },
  methods: {
    markSuccess (success, msg) {
      this.isSaved.check = !this.isSaved.check
      this.isSaved.msg = msg
      setTimeout(() => {
        this.isSaved.check = !this.isSaved.check
      }, 2500)
    },
    async updateBoards () {
      const response = await project.updateBoards({
        lists: this.lists,
        id: this.$route.params.id
      })
      if (response.data.success) {
        this.markSuccess(response.data.success, response.data.message)
      }
    },
    async getBoards () {
      const response = await project.fetchBoards({
        id: this.$route.params.id
      })
      const projectBoards = response.data.board
      console.log(projectBoards)
      this.projectTitle = projectBoards[0].title
      projectBoards[0].lists.forEach((item) => {
        this.lists.push(item)
      })
    },
    addTask: function () {
    // - 0 to coerce to number
      let kanbanIndex = this.$refs.formSelect.options[this.$refs.formSelect.selectedIndex].id - 0
      let env = this.lists[kanbanIndex]
      let input = this.userTask
      let date = new Date().toLocaleDateString()
      if (!input) {
        alert('Add some text ;)')
        return
      }
      env.todoList.push({
        date: date,
        description: input,
        checkMigrate: false
      })
      this.updateBoards()
      env.userTask = ''
    },
    addBoard: function () {
      this.lists.push({
        title: 'Add Title',
        todoList: [],
        tasksRemaining: 0,
        checkTitle: false
      })
      this.updateBoards()
    },
    removeBoard: function (index) {
      this.lists.splice(index, 1)
      this.updateBoards()
    },
    migrateTask: function (item) {
      item.checkMigrate = !item.checkMigrate
      this.updateBoards()
    },
    moveTask: function (e, currentBoard, item, itemIndex) {
      let kanbanIndex = (e.target.options[e.target.options.selectedIndex].id) - 0

      this.lists[kanbanIndex].todoList.push(item)
      this.removeTask(currentBoard, itemIndex)
      this.migrateTask(item)
      this.updateBoards()
    },
    removeTask: function (board, index) {
      board.todoList.splice(index, 1)
      this.updateBoards()
    },
    editTitle: function (board) {
      board.checkTitle = !board.checkTitle
      this.updateBoards()
    }
  },
  beforeMount: function () {
    // this.listCount()
  }
}
</script>

<style scoped>
    .kanban-wrap{
      text-align: center;
    }
    button{
        cursor: pointer;
    }
    fieldset{
        border: none;
    }
    .add-board,
    .add-task{
        border: 0;
        color: #0090ff;
        font-weight: bold;
        padding: 5px 0;
        font-size: 1rem;
        cursor: pointer;
        transition: 0.4s all;
    }
    .add-board:after,
     .add-task:after{
         content: '+';
     }
    .add-board:hover,
    .add-task:hover{
        color: #3874a0;
    }
    .add-task{
        margin-left: 10px;
    }
    .container{
        width: 75%;
        height: auto;
        margin: 0 auto;
        padding: 10px
    }
    .task-inputs{
        float: left;
    }
    .board-inputs{
        float: right;
        padding: 15px 0;
    }
    .warning{
        background: yellow !important;
        color: #000 !important;
    }
    .caution{
        background: #ff5747!important;
        color: #fff !important;
    }
    .kanban-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        padding-top: 30px;
    }
    .kanban-container > div{
        width: 33.33%;
        box-sizing: border-box;
        border: 1px solid #efefef;
        position: relative;
        padding: 15px 15px 5px 15px;
    }
    .kanban-task-count{
        position: absolute;
        top: -15px;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        border: 1px solid gray;
        background: #0090ff;
        color: #fff;
        transition: 0.25s all;
    }
    .kanban-task-count span{
        display: block;
        padding: 5px;
    }
    ul{
        padding: 0;
    }
    ul li{
        display: block;
    }
    .list-item{
        margin-bottom: 15px;
        transition: 0.25s all;
        background: #fff;
        position: relative;
        border: 1px solid lightgray;
    }
    .list-item:after{
      content: '';
      display: block;
      width: 100%;
      position: absolute;
      z-index: -1;
      top: 9px;
      left: -9px;
      height: 100%;
      background: #e4e4e4;
    }
    .item-content{
        padding: 10px 15px;
    }
    .item-content p{
        margin-top: 0;
        text-align: left;
    }
    .item-date{
        margin-right: 10px;
        float: left;
    }
    .delete{
        background: #ff5747;
        border: 0;
        color: #fff;
    }
    .edit{
        background: #0090ff;
        border: 0;
        color: #fff;
    }
    .item-group{
        overflow: auto;
    }
    .btn-group-right{
        float: right;
    }
    .edit-title{
        margin-top: 15px;
    }
    .saved-prompt{
      position: absolute;
      right: 15px;
      bottom: 15px;
      background: lightgreen;
      padding: 5px 20px;
      color: #3e653e;
      animation: prompt-open 0.4s ease-in-out;
    }
    .ni-input{
      box-sizing: border-box;
      padding: 5px;
      margin: 2.5% 0;
      font-size: 1.15rem;
      border: 0;
      border-bottom: 1px solid #d1d1d1;
    }
    .select-board{
      appearance: none;
      padding: 10px 20px;
      background: transparent;
      border-radius: 0;
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
