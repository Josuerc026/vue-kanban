import axios from 'axios'
axios.defaults.withCredentials = true
export default () => {
  return axios.create({
    baseURL: `https://vue-kanban-api.herokuapp.com/`
  })
}
