/* eslint-disable */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// let innerProjectsSchemaList = new Schema({
//  date: String,
//  description: String,
//  checkMigrate: Boolean
// })
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
});

module.exports = mongoose.model('Project', ProjectsSchema);