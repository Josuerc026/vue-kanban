import Vue from 'vue'
import Router from 'vue-router'
import Kanban from '../components/kanban'
import Projects from '../components/Projects'
import newProject from '../components/newProject'
import Register from '../components/register'
import Login from '../components/login'
import LogOut from '../components/logout'

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
      path: '/projects/new',
      name: 'New Project',
      component: newProject
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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LogOut
    }
  ]
})
