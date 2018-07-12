import Api from '@/services/Api'

export default {
  logout () {
    return Api().get('logout')
  }
}
