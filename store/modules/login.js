const state = {
  userInfo: {}
}
const mutations = {
  SetUserInfo(state, data) {
    state.userInfo = data;
  }
}
const actions = {
  async getUserInfo({ commit }, data) {}
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}