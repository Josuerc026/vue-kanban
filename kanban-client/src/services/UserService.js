import Api from '../services/Api'

export default {
  getUser () {
    return Api().get('/user')
  }
}
