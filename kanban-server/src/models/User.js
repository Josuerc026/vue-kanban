/* eslint-disable */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//PROJECT SCHEMAS
let innerProjectsSchema = new Schema({
 title: String,
 todoList: [{
  date: String,
  description: String,
  checkMigrate: Boolean
 }],
 tasksRemaining: Number,
 checkTitle: Boolean
})
let ProjectsSchema = new Schema({
 title: String,
 lists: [innerProjectsSchema]
})

//USER SCHEMA FOR AUTH
let User = new Schema({
 firstname: String,
 lastname: String,
 username: {
  type: String,
  unique: true
 },
 password: String,
 projects: [ProjectsSchema]
})

module.exports = mongoose.model('User', User);