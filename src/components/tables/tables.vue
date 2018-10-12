<template>
  <div>
    <!--<yd-navbar title="图表">-->
      <!--<router-link to="#" slot="left">-->
        <!--<yd-navbar-back-icon></yd-navbar-back-icon>-->
      <!--</router-link>-->
      <!--<router-link to="#" slot="right">-->
        <!--<img id="compare" @click="pickAnother" src="../../assets/img/compare@3x.png" alt="对比">-->
        <!--<yd-popup v-model="show1" position="center" width="80%" style="radius:5px;">-->
          <!--<div style="background-color:#fff;height:100px;">-->
            <!--<yd-datetime type="date"-->
                         <!--style="height: 50px;line-height: 50px;text-align: center;width:49%;display:inline-block;font-size:20px;color:#000;"-->
                         <!--v-model="startTime2"></yd-datetime>-->
            <!--~-->
            <!--<yd-datetime type="date"-->
                         <!--style="height: 50px;line-height: 50px;text-align: center;width:49%;display:inline-block;font-size:20px;color:#000;"-->
                         <!--v-model="endTime2"></yd-datetime>-->
            <!--<p style="text-align: center;padding: 10px 0;">-->
              <!--<yd-button style="width:50px;height:30px;font-size:14px;margin-right:50px;" type="hollow"-->
                         <!--@click.native="getAnother">确定-->
              <!--</yd-button>-->
              <!--<yd-button style="width:50px;height:30px;font-size:14px;margin-left:50px;" type="hollow"-->
                         <!--@click.native="show1 = false">取消-->
              <!--</yd-button>-->
            <!--</p>-->
          <!--</div>-->
        <!--</yd-popup>-->
      <!--</router-link>-->
    <!--</yd-navbar>-->
    <div id="tables">
      <div id="datepick1">
        <yd-datetime type="date"
                     style="height: 20px;line-height: 20px;text-align: center;width:40%;display:inline-block;font-size:12px;"
                     :callback="refresh1" v-model="startTime"></yd-datetime>
        ~
        <yd-datetime type="date"
                     style="height: 20px;line-height: 20px;text-align: center;width:40%;display:inline-block;font-size:12px;"
                     :callback="refresh1" v-model="endTime"></yd-datetime>
      </div>
      <div v-if="picked" id="datepick2">
        <yd-datetime type="date"
                     style="height: 20px;line-height: 20px;text-align: center;width:40%;display:inline-block;font-size:12px;"
                     :callback="getAnother" v-model="startTime2"></yd-datetime>
        ~
        <yd-datetime type="date"
                     style="height: 20px;line-height: 20px;text-align: center;width:40%;display:inline-block;font-size:12px;"
                     :callback="getAnother" v-model="endTime2"></yd-datetime>
      </div>
      <div id="tablewarpOut">
        <div id="tablewarpinner">
          <div id="tablearea">
            <yd-tab @callback="clickTab" horizontal-scroll>
              <yd-tab-panel v-for=" item in optionArr" :keys="item" :label="item.option.series.name">
                <div class='tableWarp'>
                  <v-chart :options="item.option" @click="onClick" ref="pie1"/>
                </div>
                <div id="showInfo">
                  <p>{{showInfo.precent}}%</p>
                  <p>{{showInfo.value}}</p>
                </div>
                <div id="info">
                  <div id="total"><p>总支出{{item.total}}</p></div>
                  <!-- <div style="float:right;"><p>日均支出</p><p>58.92</p></div> -->
                </div>
                <div id="list">
                  <div>支出列表</div>
                  <div class="listwarp" v-for="subitem in item.option.series.data" v-if="subitem.value > 0">
                    <router-link :to="{path:'/showDetail', query:{merchtp:subitem.merchTp}}">
                      <div class="listitem">
                        <div class="listsubtitle">{{subitem.name}}</div>
                        <div class="listbar">
                          <yd-progressbar type="line" :progress="subitem.precent/100" trail-width="4"
                                          trail-color="#FE5D51"></yd-progressbar>
                        </div>
                      </div>
                      <div class="listnumber">
                        <p>{{subitem.value}}</p>
                        <p>共{{subitem.number}}笔</p>
                      </div>
                    </router-link>
                  </div>
                </div>
              </yd-tab-panel>
            </yd-tab>
          </div>

        </div>
      </div>
    </div>
    <div class="button-warper">
      <yd-button size="large" type="primary" shape="circle" bgcolor="#f00" color="#fff" @click.native="handleClick">分享</yd-button>
    </div>
  </div>
</template>


<script>
  // import {beforeEnterRouter} from "../../request/request"
  import ECharts from "vue-echarts/components/ECharts";
  import "echarts/lib/chart/pie";
  import "echarts/lib/component/polar";
  import "echarts/lib/component/tooltip";
  import "echarts/lib/component/title";
  import "echarts/lib/component/legend";

  import Vue from "vue";
  import {
    NavBar,
    NavBarBackIcon,
    NavBarNextIcon
  } from "vue-ydui/dist/lib.rem/navbar";
  import {DateTime} from "vue-ydui/dist/lib.rem/datetime";
  import {ProgressBar} from 'vue-ydui/dist/lib.rem/progressbar';
  import {GridsGroup, GridsItem} from 'vue-ydui/dist/lib.rem/grids';
  import config from "../../config/config"
  import {beforeEnterRouter,share} from "../../request/request"


  Vue.component(NavBar.name, NavBar);
  Vue.component(NavBarBackIcon.name, NavBarBackIcon);
  Vue.component(NavBarNextIcon.name, NavBarNextIcon);
  Vue.component(DateTime.name, DateTime);


  export default {
    name: "Echarts",
    components: {
      "v-chart": ECharts
    },
    data: function () {

      return {
        show1: false,
        picked: false,
        startTime: "",
        endTime: "",
        startTime2: "",
        endTime2: "",
        showInfo: {
          precent: 56,
          value: 1000.89
        },
        optionArr: [{
          option: {
            series: {
              name: "yefy",
              type: "pie",
              radius: ["40%", "60%"],
              sort: null,
              label: {
                position: "outside",
                rotate: 0
              },
              data: [
                {
                  name: "餐饮",
                  merchTp: "01",
                  value: 100,
                  precent: 20,
                  number: 0
                },
                {
                  name: "交通",
                  merchTp: "02",
                  value: 54,
                  precent: 20,
                  number: 2
                },
                {
                  name: "娱乐",
                  merchTp: "03",
                  value: 515,
                  precent: 21,
                  number: 3
                },
                {
                  name: "购物",
                  merchTp: "04",
                  value: 321,
                  precent: 21,
                  number: 3
                },
                {
                  name: '其他',
                  merchTp: "05",
                  value: 345,
                  precent: 45,
                  number: 5
                }
              ]
            }
          },
          showInfo: {
            precent: 56,
            value: 1000.89
          },
          total: 1234
        }, {
          option: {
            series: {
              name: "yefy",
              type: "pie",
              radius: ["40%", "60%"],
              sort: null,
              label: {
                position: "outside",
                rotate: 0
              },
              data: [
                {
                  name: "餐饮",
                  merchTp: "01",
                  value: 100,
                  precent: 20,
                  number: 0
                },
                {
                  name: "交通",
                  merchTp: "02",
                  value: 54,
                  precent: 20,
                  number: 2
                },
                {
                  name: "娱乐",
                  merchTp: "03",
                  value: 515,
                  precent: 21,
                  number: 3
                },
                {
                  name: "购物",
                  merchTp: "04",
                  value: 321,
                  precent: 21,
                  number: 3
                },
                {
                  name: '其他',
                  merchTp: "05",
                  value: 345,
                  precent: 45,
                  number: 5
                }
              ]
            }
          },
          showInfo: {
            precent: 56,
            value: 1000.89
          },
          total: 1234
        }],
        total: 14314,
      };
    },
    created() {
      this.$nextTick(() => {


        this.refresh(1);
      })
    },
    mounted() {
      beforeEnterRouter("图表", "对比", () => {
        this.pickAnother();
      })
      this.$data.endTime = this.$store.state.endTime;
      // this.$data.endTime = "2018-06-07";
      this.$data.startTime = this.$store.state.startTime;
      // this.$data.startTime = "2018-06-04";
    },
    methods: {
      handleClick(){
        share("云闪付账单","这是一个人的账单","",location.href)
      },
      onClick(event, instance, echarts) {
        console.log(arguments[0].data);
        this.showInfo = arguments[0].data;
      },
      pickAnother() {
        this.show1 = true;
      },
      getAnother() {
        console.log("getAnother");
        this.$data.picked = true
        this.$data.show1 = false
        this.refresh(this.$data.startTime2, this.$data.endTime2, 2)
      },
      refresh1() {
        let startTime = new Date(this.$data.startTime)
        let endTime = new Date(this.$data.endTime)
        if (endTime > startTime) {
          console.log("updata date1");
          this.refresh(1)
        }
      },
      refresh(date1, date2, flag) {
        let arr = this.$store.state.mountList.split("|")
        this.$store.dispatch("getSelectList", {
            cardNo: this.$store.state.cardList.join("|"),
            startDate: date1 || this.$store.state.startTime,
            endDate: date2 || this.$store.state.endTime,
            bigAmount: arr[0],
            smallAmount: arr[1],
            merchtp: this.$store.state.merchTpList.join("|"),
            page: 0,
            pagesize: config.const.pagesize
          }
        ).then(({data}) => {
          console.log(data, "************")
          let prodata = [
            {
              name: "餐饮",
              merchTp: "01",
              value: 0,
              precent: 0,
              number: 0
            },
            {
              name: "交通",
              merchTp: "02",
              value: 0,
              precent: 0,
              number: 0
            },
            {
              name: "娱乐",
              merchTp: "03",
              value: 0,
              precent: 0,
              number: 0
            },
            {
              name: "购物",
              merchTp: "04",
              value: 0,
              precent: 0,
              number: 0
            },
            {
              name: '其他',
              merchTp: "05",
              value: 0,
              precent: 0,
              number: 0
            }
          ];
          let total = 0;
          for (let i = 0, l = data.length; i < l; i++) {
            total += data[i].amount;
            if (data[i].merchtp === "01") {
              prodata[0].value += data[i].amount;
              prodata[0].number += 1;
            }
            if (data[i].merchtp === "02") {
              prodata[1].value += data[i].amount;
              prodata[1].number += 1;
            }
            if (data[i].merchtp === "03") {
              prodata[2].value += data[i].amount;
              prodata[2].number += 1;
            }
            if (data[i].merchtp === "04") {
              prodata[3].value += data[i].amount;
              prodata[3].number += 1;
            }
            if (data[i].merchtp === "05") {
              prodata[4].value += data[i].amount;
              prodata[4].number += 1;
            }
          }
          for (let i = 0, l = data.length; i < l; i++) {
            prodata[i].precent = parseInt(prodata[i].value / total * 100);
          }

          console.log(prodata)

          let finalData = {
            option: {
              series: {
                name: "数据" + flag,
                type: "pie",
                radius: ["40%", "60%"],
                sort: null,
                label: {
                  position: "outside",
                  rotate: 0
                },
                data: prodata
              }
            },
            showInfo: {
              precent: 56,
              value: 1000.89
            },
            total: total,
            dateStart: "",
            dateEnd: ''
          };
          if (flag == 1) {
            this.$data.optionArr[0] = finalData;
          } else if (flag == 2) {
            this.$data.optionArr[1] = finalData;
          }
        })
      },
      clickTab() {
        console.log("yefy");
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import "../../assets/css/fonction.scss";


  .button-warper{
    padding: rem(20) rem(18);
  }
  .echarts {
    width: 100%;
    height: rem(200);
  }

  ul.yd-tab-nav {
    margin: 0 auto;
  }

  #info > div {
    display: inline-block;
    color: #999999;
    font-size: rem(12);
  }

  .listitem, .listnumber {
    display: inline-block;
  }

  .listitem {
    width: 75%;
  }

  .listnumber {
    width: 19%;
    font-size: rem(12);
    color: #69B076;
    letter-spacing: 0;
    text-align: right;
  }

  .listsubtitle {
    font-size: rem(12);
    color: #333333;
  }

  #labels {
    width: 100% !important;
    background-color: #fff;
    overflow: hidden;
  }

  #labels > div {
    font-size: rem(13);
    text-align: center;
  }

  #tablearea > div {
    margin: 0 auto;
  }

  #tablearea {
    width: 100% !important;
  }

  #tablewarpinner {
    width: 95%;
    margin: 0 auto;
    border-radius: 9px;
    background-color: #f5f5f5;
    box-shadow: 2px 2px 1px #888888;
  }

  #tablewarpinner > div {
    width: 95%;
    margin: 0 auto;
  }

  #tablewarpOut {
    background-color: #fff;
  }

  #compare {
    width: rem(18);
    width: rem(18);
  }

  #list {
    background-color: #fff;
    width: 100% !important;
  }

  #list > div {
    width: 95%;
    margin: 0 auto;
  }

  .listwarp {
    border-top: 1px solid #f5f5f5;
    padding: rem(10) 0;
  }

  #showInfo > p {
    text-align: center;
  }

  #showInfo {
    position: relative;
    top: rem(-120);
  }

  #total > p {
    text-align: center;
    margin: auto;
  }

  #total, #info {
    text-align: center;
  }

  #datepick1, #datepick2 {
    display: inline-block;
    width: 49%;
  }
</style>


