import Api from '@/services/Api'

export default {
  fetchProjects () {
    return Api().get('projects')
  },
  newProject (project) {
    return Api().post('add_project', project)
  }
}
