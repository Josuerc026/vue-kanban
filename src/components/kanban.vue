<template>
    <div class="container">
        <div class="kanban-wrap">
            <form v-on:submit.prevent="addTask($event)">
                <fieldset>
                    <div class="task-inputs">
                        <input type="text" v-model="userTask" autocomplete="true" placeholder="Add Task...">
                        <select ref="formSelect">
                            <option v-for="(koptions, index) in lists" :key="koptions.id" :id="index">{{koptions.title}}</option>
                        </select>
                        <button type="submit" class="add-task">add task</button>
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
                    <div v-if="kanban.checkTitle">
                        <input type="text" v-model="kanban.title">
                        <button @click="editTitle(kanban)">done</button>
                    </div>
                    <h3>
                        {{kanban.title}}
                        <button @click="editTitle(kanban)" class="edit-board-title">edit</button>
                        <button @click="removeBoard(index)" class="remove-board">Delete</button>
                    </h3>
                    <ul>
                        <li v-for="(item, index) in kanban.todoList" :key="item.id" class="list-item">
                            <small>{{item.date}}</small>
                            <p>{{item.description}}</p>
                            <button @click="migrateTask(item, null)">Move</button>
                            <button @click="removeTask(kanban, index)">Delete</button>
                            <div v-if="item.checkMigrate">
                                <select @change="moveTask($event,kanban,item, index)">
                                    <option>Select Board</option>
                                    <option v-for="(koptions, index) in lists" :key="koptions.id" :id="index">{{koptions.title}}</option>
                                </select>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "kanban",
    data: function(){
        return{
            setWarning: false,
            setAlert: false,
            userTask: '',
            lists: [
                {
                    title: 'Upcoming Tasks',
                    todoList: [],
                    tasksRemaining: 0,
                    checkTitle: false
                },
                {
                    title: 'Current Tasks',
                    todoList: [],
                    tasksRemaining: 0,
                    checkTitle: false
                },
                {
                    title: 'Completed Tasks',
                    todoList: [],
                    tasksRemaining: 0,
                    checkTitle: false
                }
            ]
        }
    },
    computed: {

    },
    methods: {
        addTask: function(){
			// - 0 to coerce to number
            let kanbanIndex = this.$refs.formSelect.options[this.$refs.formSelect.selectedIndex].id - 0,
                env = this.lists[kanbanIndex],
                input = this.userTask,
                date = new Date().toLocaleDateString();

            if(!input){
                alert('Add some text ;)');
                return;
            }
            env.todoList.push({
                date: date,
                description: input,
                checkMigrate: false
            });
            env.userTask = '';
        },
        addBoard: function(){
            this.lists.push( {
                title: 'Add Title',
                todoList: [],
                tasksRemaining: 0,
                checkTitle: false
            });
            this.listCount();
        },
        removeBoard: function(index){
            this.lists.splice(index,1);
            this.listCount();
        },
        migrateTask: function(item){
            item.checkMigrate = !item.checkMigrate;
        },
        moveTask: function(e, currentBoard, item, itemIndex){
            let kanbanIndex = (e.target.options[e.target.options.selectedIndex].id) - 0;

            this.lists[kanbanIndex].todoList.push(item);
            this.removeTask(currentBoard, itemIndex);
            this.migrateTask(item);
        },
        removeTask: function(board, index){
            board.todoList.splice(index, 1);
        },
        editTitle: function(board){
            board.checkTitle = !board.checkTitle;
        },
        listCount: function(){
            this.$emit('list-count', this.lists.length);
        }
    },
    beforeMount: function () {
        this.listCount();
    }
}
</script>

<style scoped>
    button{
        cursor: pointer;
    }
    fieldset{
        border: none;
    }
    .add-board,
    .add-task{
        border: 0;
        color: #04a09c;
        font-weight: bold;
        padding: 5px 0;
        font-size: 1rem;
        cursor: pointer;
    }
    .add-board:after,
    .add-task:after{
        content: '+';
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
        flex-grow: 1;
        border: 1px solid #efefef;
        position: relative;
        padding: 10px 10px 5px 10px;
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
        background: #04a09c;
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
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        transition: 0.25s all;
    }
    .remove-board{
        background: #ff5747;
        border: 0;
        color: #fff;
    }
    .edit-board-title{
        background: #0090ff;
        border: 0;
        color: #fff;
    }
</style>