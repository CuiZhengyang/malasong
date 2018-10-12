import Vue from 'vue'
const mutations = {
  change(state,result){
    console.log("aaa")
    state.cardList=result.cardList;
    state.mountList=result.smallAmount+"|"+result.bigAmount;
    let arr=result.merchTp.split("|");
    state.merchTpList=arr;
  }
};
export default mutations
