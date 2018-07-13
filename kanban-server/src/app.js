const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config/config')
const session = require('express-session')
const User = require('./models/User')

// const path = require('path');
// const serveStatic = require('serve-static');
// app.us665m e(serveStatic(__dirname + "/dist"));
// app.use(express.static(path.join(__dirname, '../client/dist')));

const app = express()
app.use(morgan('combined'))
app.use(cors({
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST'],
  credentials: true // enable set cookie
}))
app.use(session({
  key: 'session.sid',
  secret: 'to33dgop54phsoa6knclgamps3f2',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(bodyParser.json())

let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/users').catch(function (reason) {
  console.log('Unable to connect to the mongodb instance. Error: ', reason)
})
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('Connection Succeeded')
})

app.post('/register', (req, res) => {
  let db = req.db
  let reqObj = {
    firstname: req.body.firstname,
    lastname: req.body.lasttname,
    username: req.body.username,
    password: req.body.password
  }
  let newProject = new User(reqObj)
  newProject.save(function (error) {
    if (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Error: User not created'
      })
    } else {
      res.send({
        success: true,
        message: `User created!`
      })
    }
  })
})
app.post('/login', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  if (!username && !password && req.session.user) {
    return res.status(200).send({
      success: true,
      message: 'Logged in already'
    })
  }
  User.findOne({ username: username, password: password }, (err, user) => {
    if (err) {
      console.log(err)
      res.status(500).send({
        success: false,
        message: 'could not log in user'
      })
    }
    if (!user) {
      res.status(404).send({
        success: false,
        message: 'No user found'
      })
    } else {
      req.session.user = user
      req.session.save((err) => {
        if (!err) {
          console.log(req.session)
        }
      })
      return res.status(200).send({
        success: true,
        message: 'Logged in!'
      })
    }
  })
})
app.get('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err)
      } else {
        return res.send({
          success: true,
          message: 'Logged out'
        })
      }
    })
  }
})
app.post('/add_project', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send()
  }
  let db = req.db
  User.findById(req.session.user._id, 'projects', (err, user) => {
    let reqObj = {
      title: req.body.title,
      lists: [{
        title: req.body.board.title,
        todoList: [
          {
            date: req.body.board.item.date,
            description: req.body.board.item.description,
            checkMigrate: req.body.board.item.checkMigrate
          }
        ],
        tasksRemaining: req.body.board.tasksRemaining,
        checkTitle: req.body.board.checkTitle
      }]
    }
    user.projects.push(reqObj)
    user.markModified('projects')
    user.save(function (error) {
      if (error) {
        console.log(error)
        res.status(500).send({
          success: false,
          message: 'Error: Project was not saved'
        })
      } else {
        res.send({
          success: true,
          message: 'Project saved successfully!'
        })
      }
    })
  })
})
app.get('/projects', (req, res) => {
  console.log(req.session.user)
  if (!req.session.user) {
    return res.status(401).send()
  }
  User.findById(req.session.user._id, 'projects', (err, projects) => {
    console.log(projects)
    if (err) { console.error(err) }
    res.send({
      projects: projects
    })
  }).sort({_id: -1})
})

// app.delete('/wipe', (req, res) => {
//   let db = req.db
//   Project.remove({}, (err) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.end('successfully deleted all')
//     }
//   })
// })

app.listen(config)
