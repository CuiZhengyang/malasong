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
            <yd-list theme="4" slot="list">
              <yd-list-item v-for="item, key in list" :key="key">
                <img slot="img" :src="item.img">
                <span slot="title">{{item.title}}</span>
                <yd-list-other slot="other">
                  <div>
                    <span class="demo-list-price"><em>¥</em>{{item.price}}</span>
                    <span class="demo-list-del-price">¥{{item.w_price}}</span>
                  </div>
                  <div>content</div>
                </yd-list-other>
              </yd-list-item>
            </yd-list>
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
          {img: "//img1.shikee.com/try/2016/06/23/14381920926024616259.jpg", title: "标题111标题标题标题标题", price: 156.23, w_price: 89.36},
          {img: "//img1.shikee.com/try/2016/06/21/10172020923917672923.jpg", title: "标题222标题标题标题标题", price: 256.23, w_price: 89.36},
          {img: "//img1.shikee.com/try/2016/06/23/15395220917905380014.jpg", title: "标题333标题标题标题标题", price: 356.23, w_price: 89.36},
          {img: "//img1.shikee.com/try/2016/06/25/14244120933639105658.jpg", title: "标题444标题标题标题标题", price: 456.23, w_price: 89.36},
          {img: "//img1.shikee.com/try/2016/06/26/12365720933909085511.jpg", title: "标题555标题标题标题标题", price: 556.23, w_price: 89.36},
          {img: "//img1.shikee.com/try/2016/06/19/09430120929215230041.jpg", title: "标题666标题标题标题标题", price: 656.23, w_price: 89.36}
        ]
      }
    },
    methods: {
      handleEvents(type) {
        console.log('event: ', type)
      },
      refresh() {
        console.log("aaa")
      }
    }
  }
</script>

<style scoped>

</style>
<style type="text/scss" lang="scss" scoped>
  @import "./orderlist";
</style>
