<template>
  <div id="ol">
    <div class="head">
      <img src="../../assets/img/rear@3x.png" width="100%" alt="">
      <a class="button">
        <img src="../../assets/img/photo.png" alt="">
      </a>
    </div>
    <div class="select content">
      <div class="column">
        <yd-datetime type="date" class="time"
                     v-model="startTime"></yd-datetime>
      </div>
      <div class="centerLine">
        ~
      </div>
      <div class="column">
        <yd-datetime type="date" class="time"
                     v-model="endTime"></yd-datetime>
      </div>
      <div class="column" style="text-align: right">
        <img src="../../assets/img/select.png"></img>
      </div>
    </div>
    <div class="content">
      <div class="mainContent ">
        <yd-pullrefresh :callback="refresh" ref="pullrefreshDemo">
          <yd-infinitescroll :callback="refresh" ref="infinitescrollDemo">
            <!--显示一条条数据-->
            <div slot="list" class="record" v-for="(item,index) in list">
              <div class="recordWarp">
                <div class="week">
                  <label class="font1">{{showWeek(item,index)}}</label>
                  <label class="font2">{{showWeek2(item,index)}}</label>
                </div>
                <div class="typeIcon">
                  <i :class="getmerchTp(item.merchTp)"></i>
                </div>
                <div class="recordContent">
                  <label class="font1">{{getTypeName(item.merchTp)}}}</label>
                  <label class="font2">{{item.merchName}}</label>
                </div>
                <div class="recordMoney">
                  <label class="font1">{{item.amount}}</label>
                  <label class="font2">现金</label>
                </div>
              </div>
            </div>
          </yd-infinitescroll>
        </yd-pullrefresh>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: "order-list",
    data: function () {
      return {
        startTime: "2017-05-11",
        endTime: "2017-05-11",
        list: [
          {
            "cardNo": "6200000000000001",
            "payDate": "20181001",
            "payTime": "周三",
            "amount": "10.0",
            "merchTp": "01",
            "merchName": "familyMart"
          },
          {
            "cardNo": "6200000000000002",
            "payDate": "20181001",
            "payTime": "周三",
            "amount": "20.0",
            "merchTp": "02",
            "merchName": "train"
          },
          {
            "cardNo": "6200000000000001",
            "payDate": "20181001",
            "payTime": "周三",
            "amount": "10.0",
            "merchTp": "01",
            "merchName": "familyMart"
          },
          {
            "cardNo": "6200000000000002",
            "payDate": "20181001",
            "payTime": "周三",
            "amount": "20.0",
            "merchTp": "02",
            "merchName": "train"
          },
          {
            "cardNo": "6200000000000001",
            "payDate": "20181002",
            "payTime": "周四",
            "amount": "10.0",
            "merchTp": "01",
            "merchName": "familyMart"
          },
          {
            "cardNo": "6200000000000002",
            "payDate": "20181002",
            "payTime": "周四",
            "amount": "20.0",
            "merchTp": "02",
            "merchName": "train"
          },
          {
            "cardNo": "6200000000000001",
            "payDate": "20181002",
            "payTime": "周四",
            "amount": "10.0",
            "merchTp": "01",
            "merchName": "familyMart"
          },
          {
            "cardNo": "6200000000000002",
            "payDate": "20181002",
            "payTime": "周四",
            "amount": "20.0",
            "merchTp": "02",
            "merchName": "train"
          }
        ]
      }
    },
    methods: {
      handleEvents(type) {
        console.log('event: ', type)
      }
      ,
      refresh() {
        console.log("aaa")
      },
      showWeek(item, index) {
        let pre={}
        if(index!=0){
          pre= this.$data.list[index-1];
        }
        if (index == 0) {
          return item.payDate.slice(-2)
        }
        else if (pre.payDate!= item.payDate) {
          return item.payDate.slice(-2)
        }
        else {
          return ""
        }

      },
      showWeek2(item, index) {
        let pre={}
        if(index!=0){
          pre= this.$data.list[index-1];
        }

        if (index == 0) {
          return item.payTime
        }
        else if (pre.payDate != item.payDate) {
          return item.payTime
        }
        else {
          return ""
        }

      },
      getmerchTp(type){
        switch (type){
          case "01":
            return "Artboard1";
          case "02":
            return "Artboard2";
          case "03":
            return "Artboard3";
          case "04":
            return "Artboard4";
          case "05":
            return "Artboard5";
        }
      },
      getTypeName(type){
        switch (type){
          case "01":
            return "餐饮";
          case "02":
            return "货币";
          case "03":
            return "休闲";
          case "04":
            return "转账";
          case "05":
            return "加油";
        }
      }
    },

  }
</script>

<style scoped>

</style>
<style type="text/scss" lang="scss" scoped>
  @import "./orderlist";
</style>
