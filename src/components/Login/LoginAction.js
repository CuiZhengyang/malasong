import {post, accessId, ShowToast} from '../../request/request'
import config from '../../config/config'
import Vue from "vue"
import router from "../../router/index"
import {Confirm, Alert, Toast, Notify, Loading} from 'vue-ydui/dist/lib.rem/dialog';

export default {
  /**
   * 发送短信验证码的接口
   * @param context
   * @param options
   */
  sendMobile(context, options) {
    let data = {
      mobileNum: options.pNo//手机号码
    };
    post(config.url.sendMobile, data).then(function ({data}) {
      // 响应成功回调
      if (data.code == config.resCode.success) {
        context.commit("changeSendMobile", {status: true})
      }
      else {
        ShowToast(data.msg)
      }
    });
  },
  /**
   * 登录的接口
   * @param context
   * @param options
   */
  login(context, options) {

    let data = {
      accessId: accessId, //接入方ID
      // accessKey: "", //接入方密码
      mobileNum: options.pNo,//手机号
      verifyCode: options.msgNo//短信验证码
    };
    post(config.url.login, data).then(function ({data}) {
      // 响应成功回调
      if (data.code == config.resCode.success) {
        context.commit("changeIdAndPno", {
          pNo: options.pNo,
          id: options.pNo
        });
        //身份验证成功,判断跳转地址

        switch (parseInt(data.data.status)) {
          case 1:  //用户注册入库完成
            router.push({path: `/idCheck`});
            // location.href='https://open.weixin.qq.com/connect/oauth2/authorize?' +
            //   'appid='+config.const.appID+'&' +
            //   'redirect_uri='+location.protocol+"//"+location.host+"/facepayWeixin/IdCheck" +
            //   'response_type=code&' +
            //   'scope=snsapi_base&' +
            //   'state=123#wechat_redirect';
            break;
          case 2:  //用户认证完成
            router.push({path: `/AddCard`});
            break;
          case 3:  //用户绑卡完成
            router.push({path: `/servContent`});
            break;
        }
      }
      else {
        Alert({mes: data.msg});
      }
    });
  },
}
