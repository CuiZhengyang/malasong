import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex);

let date=new Date();
let year=date.getFullYear();
let month=date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
let day=date.getDay()+1<10?"0"+(date.getDay()+1):date.getDay()+1;

let startTime=year+"-"+month+"-01";
let endTime=year+"-"+month+"-"+day;

let state = {
  cardList: ['6200000000000001'],
  mountList: '0|100',
  merchTpList:['01'],
  startTime:startTime,
  endTime:endTime
};

const store = new Vuex.Store({
  state,
  getters: {
  },
  mutations: mutations,
  actions: actions,
});

export default store;
