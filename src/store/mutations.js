import Vue from 'vue'
const mutations = {
  change(state,result){
    console.log("aaa")
    state.cardList=result.cardNo;
    state.mountList=result.smallAmount+"|"+result.bigAmount;
    let arr=result.merchTp.split("|");
    state.merchTpList=arr;
  },
  changeStartTime(state,result){
    state.startTime=result;
  },
  changeEndTime(state,result){
    state.endTime=result;
  }
};
export default mutations
