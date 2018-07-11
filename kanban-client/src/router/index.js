import Vue from 'vue'
import Router from 'vue-router'
import Kanban from '../components/kanban'
import Projects from '../components/Projects'
import Register from '../components/register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/board',
      name: 'Kanban',
      component: Kanban
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
