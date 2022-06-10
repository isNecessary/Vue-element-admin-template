const state = {
  tab: ''
}
const mutations = {
  SET_TAB: (state, tab) => {
    state.tab = tab
  }
}
const actions = {
  setTabName({ commit }, tab) {
    commit('SET_TAB', tab)
  }
}
export default {
  nameSpaced: true,
  state,
  mutations,
  actions
}
