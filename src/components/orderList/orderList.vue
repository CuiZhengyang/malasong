<template>
  <div id="ol">
    <div class="head">
      <img src="../../assets/img/rear@3x.png" width="100%" alt="">

      <a class="button" @click="go">
        <img src="../../assets/img/photo.png" alt="">
      </a>
    </div>
    <div class="select content">
      <div class="column">
        <yd-datetime type="date" class="time" :callback="refresh"
                     v-model="startTime"></yd-datetime>
      </div>
      <div class="centerLine">
        ~
      </div>
      <div class="column">
        <yd-datetime type="date" class="time" :callback="refresh"
                     v-model="endTime"></yd-datetime>
      </div>
      <div class="column" @click="showSelectPanel" style="text-align: right">
        <img src="../../assets/img/select.png"></img>
      </div>
    </div>
    <div class="content">
      <div class="mainContent ">
        <yd-pullrefresh :callback="refresh" ref="pullrefreshDemo" :show-init-tip="false">
          <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
            <!--显示一条条数据-->
            <div slot="list" class="record" v-for="(item,index) in list">
              <div class="recordWarp">
                <div class="week">
                  <label class="font1">{{showWeek(item,index)}}</label>
                  <label class="font2">{{showWeek2(item,index)}}</label>
                </div>
                <div class="typeIcon">
                  <i :class="getmerchtp(item.merchtp)"></i>
                </div>
                <div class="recordContent">
                  <label class="font1">{{getTypeName(item.merchtp)}}</label>
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
    <selectPlugin :show="showSelect" @selectResult="changeSelect" @closeSelect="closeSelect"></selectPlugin>
  </div>

</template>

<script>
  import config from "../../config/config"
  import {beforeEnterRouter} from "../../request/request"
  export default {
    name: "order-list",
    data: function () {
      return {
        showSelect: false,
        // startTime: "",
        // endTime: "",
        list: [
          // {
          //   "cardNo": "6200000000000001",
          //   "payDate": "20181001",
          //   "paytime": "周三",
          //   "amount": "10.0",
          //   "merchtp": "01",
          //   "merchName": "familyMart"
          // },
          // {
          //   "cardNo": "6200000000000002",
          //   "payDate": "20181001",
          //   "paytime": "周三",
          //   "amount": "20.0",
          //   "merchtp": "02",
          //   "merchName": "train"
          // },
          // {
          //   "cardNo": "6200000000000001",
          //   "payDate": "20181001",
          //   "paytime": "周三",
          //   "amount": "10.0",
          //   "merchtp": "01",
          //   "merchName": "familyMart"
          // },
          // {
          //   "cardNo": "6200000000000002",
          //   "payDate": "20181001",
          //   "paytime": "周三",
          //   "amount": "20.0",
          //   "merchtp": "02",
          //   "merchName": "train"
          // },
          // {
          //   "cardNo": "6200000000000001",
          //   "payDate": "20181002",
          //   "paytime": "周四",
          //   "amount": "10.0",
          //   "merchtp": "01",
          //   "merchName": "familyMart"
          // },
          // {
          //   "cardNo": "6200000000000002",
          //   "payDate": "20181002",
          //   "paytime": "周四",
          //   "amount": "20.0",
          //   "merchtp": "02",
          //   "merchName": "train"
          // },
          // {
          //   "cardNo": "6200000000000001",
          //   "payDate": "20181002",
          //   "paytime": "周四",
          //   "amount": "10.0",
          //   "merchtp": "01",
          //   "merchName": "familyMart"
          // },
          // {
          //   "cardNo": "6200000000000002",
          //   "payDate": "20181002",
          //   "paytime": "周四",
          //   "amount": "20.0",
          //   "merchtp": "02",
          //   "merchName": "train"
          // }
        ],
        page: 0,
      }
    },
    created: function () {
      this.$nextTick(() => {

        beforeEnterRouter("交易记录")
        this.refresh();
      })
    },
    methods: {
      refresh() {
        let arr=this.$store.state.mountList.split("|")
        this.$store.dispatch("getSelectList", {
            cardNo: this.$store.state.cardList.join("|"),
            startDate: this.$store.state.startTime,
            endDate: this.$store.state.endTime,
            bigAmount: arr[1],
            smallAmount: arr[0],
            merchtp: this.$store.state.merchTpList.join("|"),
            page: 0,
            pagesize: config.const.pagesize
          }
        ).then(({data})=>{
          this.$data.page = 0;
          this.$data.list = data;
          this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        })
      },
      loadMore(){
        let self = this;
        if (this.$data.list.length >= config.const.pagesize) {
          let arr=this.$store.state.mountList.split("|")
          this.$store.dispatch("getSelectList", {
            cardNo: this.$store.state.cardList.join("|"),
            startDate: this.$store.state.startTime,
            endDate: this.$store.state.endTime,
            bigAmount: arr[1],
            smallAmount: arr[0],
            merchtp: this.$store.state.merchTpList.join("|"),
            page: this.page,
            pagesize: config.const.pagesize
          }).then(function ({data}) {
            let newArr = [...this.$data.list,...data];
            this.$data.list = newArr;
            if (data.length < config.const.pagesize) {
              self.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            }
            else {
              this.page++;
              self.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
            }
          })
        }
        else {
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
        }
      },
      changeSelect() {
        this.refresh();
      },
      showSelectPanel() {
        this.$data.showSelect = !this.$data.showSelect;
      },
      closeSelect() {
        this.$data.showSelect = false;
      },
      showWeek(item, index) {
        let pre = {}
        if (index != 0) {
          pre = this.$data.list[index - 1];
        }
        if (index == 0) {
          let string=item.payDate.toString();
          return string.slice(-2)
        }
        else if (pre.payDate != item.payDate) {
          let string=item.payDate.toString();
          return string.slice(-2)
        }
        else {
          return ""
        }
      },
      showWeek2(item, index) {
        let pre = {}
        if (index != 0) {
          pre = this.$data.list[index - 1];
        }

        if (index == 0) {
          return item.paytime
        }
        else if (pre.payDate != item.payDate) {
          return item.paytime
        }
        else {
          return ""
        }

      },
      getmerchtp(type) {
        switch (type) {
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
      getTypeName(type) {
        switch (type) {
          case "01":
            return "餐饮";
          case "02":
            return "交通";
          case "03":
            return "娱乐";
          case "04":
            return "购物";
          case "05":
            return "加油";
          default:
            return ""
        }
      },
      go(){
        this.$router.push({path: "/tables"})
      }
    },
    computed:{
      startTime:{
        get: function () {
          return this.$store.state.startTime;
        },
        // setter
        set: function (newValue) {
          console.log(newValue)
          this.$store.commit("changeStartTime",newValue)
          // this.$data.endTime=this.$store.state.endTime;
        }
      },
      endTime:{
        get: function () {
          return this.$store.state.endTime;
        },
        // setter
        set: function (newValue) {
          console.log(newValue)
          this.$store.commit("changeEndTime",newValue)
        }
      }
    }
  }
</script>

<style scoped>

</style>
<style type="text/scss" lang="scss" scoped>
  @import "./orderlist";
</style>
