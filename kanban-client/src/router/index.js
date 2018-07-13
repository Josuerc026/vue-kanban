import Vue from 'vue'
import Router from 'vue-router'
import kanban from '../components/kanban'
import Projects from '../components/Projects'
import Register from '../components/register'
import Login from '../components/login'
import LogOut from '../components/logout'
import error from '../components/error'

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
      path: '/projects/:title',
      name: 'Kanban',
      component: kanban
    },
    {
      path: '/auth/:type',
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
    },
    {
      path: '/404',
      name: 'error',
      component: error
    }
  ]
})
