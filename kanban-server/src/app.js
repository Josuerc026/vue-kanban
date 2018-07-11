const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config/config')
const Project = require('./models/projects')

// const path = require('path');
// const serveStatic = require('serve-static');
// app.us665m e(serveStatic(__dirname + "/dist"));
// app.use(express.static(path.join(__dirname, '../client/dist')));

const app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())

let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/projects').catch(function (reason) {
  console.log('Unable to connect to the mongodb instance. Error: ', reason)
})
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('Connection Succeeded')
})

app.post('/register', (req, res) => {
  res.send({
    message: `${req.body.email} are now registered!`
  })
})
app.post('/projects', (req, res) => {
  // res.send({
  //   message: 'Getting projects'
  // })
  let db = req.db
  let reqObj = {
    title: req.body.project.title,
    lists: [
      {
        title: req.body.project.board.title,
        todoList: [
          {
            date: req.body.project.board.item.date,
            description: req.body.project.board.item.description,
            checkMigrate: req.body.project.board.item.checkMigrate
          }
        ],
        tasksRemaining: req.body.project.board.tasksRemaining,
        checkTitle: req.body.project.board.checkTitle
      }
    ]
  }
  let newProject = new Project(reqObj)
  console.log(newProject)
  newProject.markModified('lists')
  newProject.save(function (error) {
    if (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Error: Post was not saved'
      })
    } else {
      res.send({
        success: true,
        message: 'Project saved successfully!'
      })
    }
  })
})
app.get('/projects', (req, res) => {
  Project.find({}, 'title', function (error, projects) {
    if (error) { console.error(error) }
    res.send({
      projects: projects
    })
  }).sort({_id: -1})
})

// require('./routes')(app)

app.listen(config)
