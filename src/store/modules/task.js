const state = {
  taskId: '',
  taskName: '',
  cateId: '',
  cateName: ''
}

const mutations = {
  setTaskId: (state, id) => {
    state.taskId = id
  },
  setTaskName: (state, name) => {
    state.taskName = name
  },
  setCateId: (state, id) => {
    state.cateId = id
  },
  setCateName: (state, name) => {
    state.cateName = name
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

