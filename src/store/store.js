import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex);

let state = {
  cardList: ['6200000000000001'],
  mountList: '0|100',
  merchTpList:['01']
};

const store = new Vuex.Store({
  state,
  getters: {
  },
  mutations: mutations,
  actions: actions,
});

export default store;
