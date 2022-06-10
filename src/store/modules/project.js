const state = {
  projectId: '',
  projectName: '',
  level: ''
}

const mutations = {
  setProjectId: (state, id) => {
    state.projectId = id
  },
  setProjectName: (state, name) => {
    state.projectName = name
  },
  setProLevel: (state, level) => {
    state.level = level
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
