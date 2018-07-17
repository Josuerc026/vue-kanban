import Api from '@/services/Api'

export default {
  fetchProjects () {
    return Api().get('projects')
  },
  newProject (project) {
    return Api().post('add_project', project)
  },
  removeProject (projectID) {
    return Api().delete('projects/' + projectID)
  },
  fetchBoards (boardId) {
    return Api().post('boards', boardId)
  },
  updateBoards (params) {
    return Api().put('projects/' + params.id, params)
  }
}
