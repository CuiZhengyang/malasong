<template>
  <div id="login">
    <swipeout>
      <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')"
                     transition-mode="follow">
        <div slot="right-menu">
          <!--<swipeout-button @click.native="onButtonClick('fav')" type="primary">aaaa</swipeout-button>-->
          <swipeout-button @click.native="onButtonClick(key)" type="warn">删除</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
          asdfasddfasddf
        </div>
      </swipeout-item>
    </swipeout>


    <yd-navbar title="登录" bgcolor="#1D2838" color="#fff"></yd-navbar>
    <yd-cell-group>
      <!--<yd-cell-item arrow>-->
      <!--<span slot="left">国家</span>-->
      <!--<span slot="right">中国大陆（+86）</span>-->
      <!--</yd-cell-item>-->
      <yd-cell-item>
        <span slot="left">手机号</span>
        <yd-input slot="right" v-model.number="phone" ref="phone" required regex="mobile"
                  :show-required-icon="false"
                  placeholder="请输入手机号"></yd-input>
      </yd-cell-item>
      <yd-cell-item id="checkMobile">
        <span slot="left">验证码</span>
        <yd-input slot="right" required v-model="msgNo" max="20" placeholder="请输入短信验证码"
                  :show-clear-icon="true"
                  :show-error-icon="false"
                  :show-success-icon="false"
                  :show-required-icon="false"
        ></yd-input>
        <yd-sendcode id="sendCode" slot="right"
                     storage-key="dashuaibi"
                     v-model="start1"
                     @click.native="sendCode1"
                     init-str="获取验证码"
                     run-str="重新发送{%s}秒"
                     reset-str="重新发送"
                     type="hollow"
        ></yd-sendcode>
      </yd-cell-item>
    </yd-cell-group>
    <div class="nextBtn">

      <yd-button size="large" type="primary" color="#fff" bgcolor="#4A90E2" @click.native="handleClick">下一步</yd-button>
      <yd-button v-if="disabled" style="margin-top: 0;" class="nextBtnShade" color="#fff" bgcolor="#fff" size="large"
                 @click.native="shade"></yd-button>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  // import myLoading from "./loading/myLoading"

  export default {
    props: [],
    data: function () {
      return {
        phone: '',
        msgNo: ""
      }
    },
    methods: {
      shade() {
        // alert("shade")
      },
      sendCode1() {
        //发送短信验证码的接口
        if (this.$refs.phone.valid) {
          this.$store.dispatch("sendMobile", {pNo: this.$data.phone})
        }
        else {
          this.$dialog.toast({
            mes: '请输入正确的电话号码！',
            timeout: 1000
          });
        }
      },
      handleClick: function () {
        if (this.$refs.phone.valid && !!this.$data.msgNo) {
          this.$store.dispatch("login", {
            pNo: this.$data.phone,
            msgNo: this.$data.msgNo
          })
        }
        else if (!this.$refs.phone.valid) {
          this.$dialog.toast({
            mes: '请输入正确的电话号码！',
            timeout: 1000
          });
        }
        else {
          this.$dialog.toast({
            mes: '请输入正确的短信验证码！',
            timeout: 1000
          });
        }
      }
    },
    computed: {
      start1: {
        get: function () {
          return this.$store.state.msgNo
        },
        set: function (value) {
          this.$store.commit("changeSendMobile", {status: false})
        }
      },
      disabled: function () {
        return !(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone) && /^\d{6}$/.test(this.msgNo) && this.start1);
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" lang="scss" scoped>
  @import "../../assets/css/login";
</style>
