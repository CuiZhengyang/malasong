<template>
  <div>
    <yd-navbar title="图表">
        <router-link to="#" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
        <router-link to="#" slot="right">
          <img id="compare" @click="pickAnother" src="../../assets/img/compare@3x.png" alt="对比">
          <yd-popup v-model="show1" position="center" width="80%"style="radius:5px;" >
              <div style="background-color:#fff;height:100px;">
                  <yd-datetime type="date" style="height: 50px;line-height: 50px;text-align: center;width:49%;display:inline-block;font-size:20px;color:#000;" v-model="datetime2Start"></yd-datetime>~
                  <yd-datetime type="date" style="height: 50px;line-height: 50px;text-align: center;width:49%;display:inline-block;font-size:20px;color:#000;" v-model="datetime2End"></yd-datetime>
                  <p style="text-align: center;padding: 10px 0;">
                    <yd-button style="width:50px;height:30px;font-size:14px;" type="hollow" @click.native="show1 = false">确定</yd-button>
                  </p>
              </div>
          </yd-popup>
        </router-link>
    </yd-navbar>
    <div id="tables">
      <yd-datetime type="date" style="height: 20px;line-height: 20px;text-align: center;width:20%;display:inline-block;font-size:12px;" v-model="datetime1Start"></yd-datetime>~
      <yd-datetime type="date" style="height: 20px;line-height: 20px;text-align: center;width:20%;display:inline-block;font-size:12px;" v-model="datetime1End"></yd-datetime>
      <div id="tablewarpOut" >
        <div id="tablewarpinner">
          <div id="tablearea">
            <yd-tab horizontal-scroll>
              <yd-tab-panel v-for=" item in optionArr" :label="item.option.series.name">
                <div class='tableWarp'>
                  <v-chart :options="item.option" @click="onClick" ref="pie1"/>
                </div>
                <div id="showInfo">
                  <p>{{showInfo.present}}%</p>
                  <p>{{showInfo.value}}</p>
                </div>
                 <div id="info">
            <div><p>总支出</p><p>3214.32</p></div>
            <div style="float:right;"><p>日均支出</p><p>58.92</p></div>
          </div>
          <div id="list">
            <div>支出列表</div>
            <div class="listwarp" v-for="subitem in item.detailData">
              <div class="listitem" >
                <div class="listsubtitle">{{subitem.name}}</div>
                <div class="listbar">
                  <yd-progressbar type="line" :progress="subitem.present" trail-width="4" trail-color="#FE5D51"></yd-progressbar> 
                </div>
              </div>
              <div class="listnumber">
                <p>{{subitem.value}}</p>
                <p>共{{subitem.number}}笔</p>
              </div>
            </div>
          </div>
              </yd-tab-panel>
            </yd-tab>
          </div>
         
        </div>
      </div>
    </div>
    
  </div>
</template>


<script>
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
import { DateTime } from "vue-ydui/dist/lib.rem/datetime";
import {ProgressBar} from 'vue-ydui/dist/lib.rem/progressbar';
import {GridsGroup, GridsItem} from 'vue-ydui/dist/lib.rem/grids';




Vue.component(NavBar.name, NavBar);
Vue.component(NavBarBackIcon.name, NavBarBackIcon);
Vue.component(NavBarNextIcon.name, NavBarNextIcon);
Vue.component(DateTime.name, DateTime);


export default {
  name: "Echarts",
  components: {
    "v-chart": ECharts
  },
  data: function() {

    return {
      show1:false,
      datetime1Start: "",
      datetime1End: "",
      datetime2Start:"",
      datetime2End:"",
      showInfo:{
        present:56,
        value: 1000.89
      },
      optionArr:[{
        option:{
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
                value: 20,
                present:0.2
              },
              {
                name: "交通",
                value: 30,
                present:0.2
              },
              {
                name: "娱乐",
                value: 10,
                present:0.2
              },
              {
                name: "购物",
                value: 150,
                present:0.2
              },
              {
                name:'其他',
                value:100,
                present:0.2
              }
            ]
          }
        },
        showInfo:{
          present:56,
          value: 1000.89
        },
        detailData:[{
          name:'酒水餐饮',
          present:0.2,
          value:1324,
          number:19
        },{
            name:'酒水餐饮',
            present:0.2,
            value:1324,
            number:19
        },{
            name:'酒水餐饮',
            present:0.2,
            value:1324,
            number:199
        }],
      }],
      total:14314,
    };
  },
  watch: {
    datetime0Start: function(value) {
      console.log(value);
    },
    datatime1End:function(value){
      console.log(value);
    }
  },
  methods: {
    onClick(event, instance, echarts) {
        console.log(arguments[0].data);
        this.showInfo = arguments[0].data;
      },
    pickAnother(){
      console.log("niha");
      this.show1 = true;
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../assets/css/fonction.scss";
.echarts {
  width: 100%;
  height: rem(200);
}
ul.yd-tab-nav{
  margin: 0 auto;
}
#info>div{
  display: inline-block;
  color:#999999;
  font-size: rem(12);
}
.listitem, .listnumber{
  display: inline-block;
}
.listitem{
  width:75%;
}
.listnumber{
  width:19%;
  font-size: rem(12);
  color: #69B076;
  letter-spacing: 0;
  text-align: right;
}
.listsubtitle{
  font-size: rem(12);
  color:#333333;
}
#labels{
  width:100% !important;
  background-color: #fff;
  overflow: hidden;
}
#labels>div{
  font-size: rem(13);
  text-align: center;
}
#tablearea>div{
  margin: 0 auto;
}
#tablearea{
  width:100% !important;
}
#tablewarpinner{
  width:95%;
  margin: 0 auto;
  border-radius: 9px;
  background-color: #f5f5f5;
  box-shadow:  2px 2px 1px #888888;
}
#tablewarpinner>div{
  width:95%;
  margin: 0 auto;
}
#tablewarpOut{
  background-color: #fff;
}
#compare{
  width:rem(18);
  width:rem(18);
}
#list{
  background-color: #fff;
  width: 100% !important;
}
#list>div{
  width: 95%;
  margin: 0 auto;
}
.listwarp{
  border-top: 1px solid #f5f5f5;
  padding:rem(10) 0;
}
#showInfo>p{
   text-align: center;
}
#showInfo{
  position: relative;
  top:rem(-120);
}
</style>


