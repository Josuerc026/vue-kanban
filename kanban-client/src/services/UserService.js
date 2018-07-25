import Api from '../services/Api'

export default {
  getUser () {
    return Api().get('/user')
  },
  updateUser (name) {
    return Api().put('/user', name)
  }
}
