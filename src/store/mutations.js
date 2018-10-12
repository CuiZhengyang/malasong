import Vue from 'vue'
const mutations = {
  /**
   * 发送短信验证码的接口
   */
  changeSendMobile(state, status) {
    state.msgNo = status.status;
  },
  /**
   * 保存用户名和电话号码
   * @param state
   * @param info
   */
  changeIdAndPno(state, info) {
    if (!!info.pNo) {
      state.pNo = info.pNo;
    }
    if (!!info.id) {
      state.uid = info.id;
    }
  },
  /**
   * 更新用户个人信息
   * @param state
   * @param info
   */
  updateUserInfo(state,info){
    state.name=info.name;
    state.certifiNum=info.certifId;
    switch (parseInt(info.certifType)){
      case 1:
        state.certifiType="身份证";
        break;
    }
    state.studentNo=info.studentNo;
    state.schoolName=info.schoolName;
    if(!!info.picLife)
    {
      state.picLife=info.picLife;
    }

  },
  /**
   * 逐一将商户添加到商户列表中
   * @param state
   * @param data
   */
  updateMerList(state, merchantList) {
    if (!!merchantList&& typeof merchantList=="object") {
      state.merchant=merchantList;
    }
  },
  /**
   * 逐一添加银行卡
   * @param state
   * @param data
   */
  updateCardList(state, cardList) {
    state.cardlist=[];
    if (!!cardList&& typeof cardList=="object") {
      cardList.forEach(function (item) {
        let str1 = "", str2 = "", str3 = "", str4 = "";
        str1 = item.cardNo.slice(0, 4);
        str2 = item.cardNo.slice(4, 8);
        str3 = item.cardNo.slice(8, 12)
        str4 = item.cardNo.slice(12, 16)
        item.cardNo = str1 + " " + str2 + " " + str3 + " " + str4;
        state.cardlist.push(item);
      })
    }

  },
  /**
   * 逐一添加消费记录
   * @param state
   * @param data
   */
  updateRecords(state,recordList){
    if (!!recordList&& typeof recordList=="object") {
      recordList.forEach(function (item) {
        state.records.push(item)
      })
    }
  },
  freshList(state, data) {
    state[data.name] = [];
  },
  /**
   * 添加授权/非授权商户信息
   * @param state
   * @param data
   */
  getSchoolLocation(state, data) {
    state.schoolLocationList = data;
  },
  updateChangePanel(state,data){
    state.tabVal=data;
  }
};
export default mutations
