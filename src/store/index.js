import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  state: {
    idMateria: 0,
    idCurso: '',
    idClase: ''
  },
  mutations: {
    change(state, newState) {
      state.idMateria = newState
    },
    changeIdCurso(state, newState) {
      state.idCurso = newState
    },
    changeIdClase(state, newState) {
      state.idClase = newState
    }
  }
})

export default store
