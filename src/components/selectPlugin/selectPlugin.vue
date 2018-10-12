<template>
  <div class="mask" v-if="ifShow" >
    <div class="selectWapper">
      <div class="head">
        <div class="left">筛选类型</div>
        <div class="right" @click="submit">
          <span>完成</span>
        </div>
      </div>
      <div class="selectContent">
        <yd-scrolltab>
          <yd-scrolltab-panel label="按卡选择" icon="demo-icons-category1" active>
            <div class="tabCard">
              <yd-checkbox-group v-model="cardList" color="#F00">
                <div class="card">
                  <i class="zsyh"></i>
                  <span class="cardName">
                    招商银行储蓄卡
                  </span>
                  <div class="cardNo">
                    6222****5166
                  </div>
                  <yd-checkbox class="cardCheck" val="6200000000000001">{{""}}</yd-checkbox>
                </div>

                <div class="card">
                  <i class="jsyh"></i>
                  <span class="cardName">
                    建设银行储蓄卡
                  </span>
                  <div class="cardNo">
                    6222****5167
                  </div>
                  <yd-checkbox class="cardCheck" val="6200000000000002">{{""}}</yd-checkbox>
                </div>
                <div class="card">
                  <i class="hxyh"></i>
                  <span class="cardName">
                    华夏银行储蓄卡
                  </span>
                  <div class="cardNo">
                    6222****5168
                  </div>
                  <yd-checkbox class="cardCheck" val="6200000000000003">{{""}}</yd-checkbox>
                </div>
                <div class="card">
                  <i class="nyyh"></i>
                  <span class="cardName">
                    农业银行信用卡
                  </span>
                  <div class="cardNo">
                    6222****5169
                  </div>
                  <yd-checkbox class="cardCheck" val="6200000000000004">{{""}}</yd-checkbox>
                </div>

              </yd-checkbox-group>

            </div>
          </yd-scrolltab-panel>

          <yd-scrolltab-panel label="金额大小" icon="demo-icons-category2">
            <div class="tabCard">
              <yd-radio-group v-model="mountList" class="mountList" color="#F00">
                <yd-radio val="0|100">100元及以下</yd-radio>
                <yd-radio val="100|500">100元~500元以下</yd-radio>
                <yd-radio val="500|1000">500元~1000元以下</yd-radio>
                <yd-radio val="1000|2000">1000元~2000元以下</yd-radio>
                <yd-radio val="2000|5000">2000元~5000元以下</yd-radio>
                <yd-radio val="5000|10000">5000以上</yd-radio>
              </yd-radio-group>
            </div>
          </yd-scrolltab-panel>

          <yd-scrolltab-panel label="消费类型" icon="demo-icons-category3">
            <div class="tabCard">
              <yd-checkbox-group class="merchTpList" v-model="merchTpList" color="#F00">
                <yd-checkbox class="merchTp" val="01"><i class="canyin"></i>餐饮</yd-checkbox>
                <yd-checkbox class="merchTp" val="02"><i class="huobi"></i>交通</yd-checkbox>
                <yd-checkbox class="merchTp" val="03"><i class="xiuxian"></i>休闲</yd-checkbox>
                <yd-checkbox class="merchTp" val="04"><i class="zhuanzhang"></i>转账</yd-checkbox>
                <yd-checkbox class="merchTp" val="05"><i class="jiayou"></i>加油</yd-checkbox>
              </yd-checkbox-group>
            </div>
          </yd-scrolltab-panel>

        </yd-scrolltab>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "select-plugin",
    props: ['show'],
    data: function () {
      return {
        cardList: [],
        mountList: '',
        merchTpList: []
      }
    },
    computed: {
      ifShow: function () {
        return this.$props.show;
      }
    },

    created: function () {
      this.$nextTick(() => {
        this.$data.cardList= this.$store.state.cardList;
        this.$data.mountList=  this.$store.state.mountList;
        this.$data.merchTpList=this.$store.state.merchTpList;
      })
    },
    methods: {
      closeSelect() {
        this.$emit("closeSelect");
      },
      submit() {
        let arr = this.$data.mountList.split("|");
        let merchTp = ""
        this.$data.merchTpList.forEach((item) => {
          merchTp += item + "|"
        })
        let result = {
          cardNo: this.$data.cardList,
          smallAmount: arr[0],
          bigAmount: arr[1],
          merchTp: merchTp
        }

        this.$store.commit("change",result)
        this.$emit("selectResult", result);
        this.$emit("closeSelect");
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  @import "./selectplugin";
</style>
