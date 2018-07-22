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
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
let dbConnect = process.env.MONGODB_URI ||'mongodb://localhost:27017/users'
mongoose.connect(dbConnect, {
  server: {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }
}).catch(function (reason) {
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
    lastname: req.body.lastname,
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
app.get('/user', (req, res) => {
  if (!req.session.user) {
    return res.status(500).send({
      success: false
    })
  }
  User.findById(req.session.user._id, (err, user) => {
    if (err) {
      console.log(err)
      res.status(500).send({
        success: false,
        message: 'could not log in user'
      })
    } else {
      res.status(200).send({
        success: true,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username
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
          // console.log(req.session)
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
  // console.log(req.session.user)
  if (!req.session.user) {
    return res.status(401).send()
  }
  User.findById(req.session.user._id, 'projects', (err, projects) => {
    if (err) { console.error(err) }
    res.send({
      projects: projects
    })
  }).sort({_id: -1})
})
app.post('/boards', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send()
  }
  User.findById({_id: req.session.user._id}, (err, user) => {
    if (err) { console.error(err) }
    let board = user.projects.filter(project => {
      // console.log('PROJECTS', project)
      return project._id.equals(req.body.id)
    })
    res.send({
      board: board
    })
  }).sort({_id: -1})
})
app.put('/projects/:id', (req, res) => {
  // let db = req.db
  User.findById(req.session.user._id, (err, user) => {
    let board = user.projects.id(req.params.id)
    if (err) {
      console.log(err)
      res.status(500).send({
        success: false
      })
    } else {
      board.lists = req.body.lists
      user.markModified('projects')
      user.save((err) => {
        if (err) {
          console.log(err)
        } else {
          res.status(200).send({
            success: true,
            message: 'Saved Successfully!'
          })
        }
      })
    }
  })
})
app.delete('/projects/:id', (req, res) => {
  console.log('REQUEST', req.params)
  User.update({
    _id: req.session.user._id
  }, {
    $pull: {
      projects: {
        _id: mongoose.Types.ObjectId(req.params.id)
      }
    }
  }, (err, project) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send({
        success: true,
        message: `successfully delete project ${req.params.id}`
      })
    }
  })
})

app.listen(config)
