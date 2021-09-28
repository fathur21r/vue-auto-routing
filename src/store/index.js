import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'vue-cookies'

Vue.use(Vuex)
Cookies.config('7d','/','',false)
export default new Vuex.Store({
  state: {
    secretCode: '',
    otpauthurl: ''
  },
  mutations: {
    saveAuth (state, payload) {
      state.secretCode = payload.secretCode
      state.otpauthurl = payload.otpauthurl
    } 
  },
  actions: {
    save (context, payload) {
      context.commit('saveAuth', payload)
    }
  },
  getters: {
    getAll: state => {
      return state
    }
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => {
        let val = Cookies.get(key)
        console.log(val);
        return val
      },
      setItem: (key, value) => Cookies.set(key, (value)),
      removeItem: key => Cookies.remove(key)
    }
  })],
})
