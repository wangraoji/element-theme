import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters';
import { getToken, setToken, removeToken } from '@/utils/auth';
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    token: getToken(),
  },
  mutations: {
    SET_TOKEN: (state: any, token: any) => {
      state.token = token
    },
  },
  getters
})

export default store
