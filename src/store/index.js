import { createStore } from 'vuex'

export default createStore({
  state: {
    pageSelected: 'login',
  },
  getters: {
    getPageSelected(state) {
      return state.pageSelected
    }
  },
  mutations: {
    setPageSelected(state, newPage) {
      state.pageSelected = newPage
    }

  },
  actions: {

  },
  modules: {
  }
})
