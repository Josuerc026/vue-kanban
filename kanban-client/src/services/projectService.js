import Api from '@/services/Api'

export default {
  fetchProjects () {
    return Api().get('projects')
  },
  newProject (project) {
    return Api().post('add_project', project)
  },
  deleteProject (project) {
    return Api().delete('projects', project)
  },
  fetchBoards (boardId) {
    return Api().post('boards', boardId)
  },
  updateBoards (params) {
    return Api().put('projects/' + params.id, params)
  }
}
