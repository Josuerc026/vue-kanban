import Vue from 'vue'
import Router from 'vue-router'
import Kanban from '../components/kanban'
import Register from '../components/register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
