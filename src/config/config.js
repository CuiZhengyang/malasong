// var rootdir = "/bioauth-core-access-web/rest/wx"
var rootdir = "/bioauth/rest/wx"
var config = {
  rootdir:"/facepayWX/",
  url: {
    isLogin: rootdir + "/isLogin",
    sendMobile: rootdir + "/getMsgCode",
    login: rootdir + "/submitCode",
    schoolLogin: rootdir + "/studentLogin",
    userInfo:rootdir+"/userInfo",
    cardList:rootdir+"/cardList",
    merList:rootdir+"/merList",
    merAuth: rootdir + "/merAuth",
    rmAuth:rootdir+"/rmAuth",
    consumRecord:rootdir+"/consumRecord",
    idCheck: rootdir + "/realAuth",
    addCard: rootdir + "/bindCard",
    delCard:rootdir+"/delCard",
    setDefaultCard:rootdir+"/setDefaultCard",
    shengWuRenZheng: rootdir + "/bioAuth",
    getweixin: rootdir + "/getToken",
    dicInfo: rootdir + "/dicInfo",
  },
  accessId:{
    weixin:"12345678901234567890",
    school:"12345678901234567892",
  },
  const: {
    toastDeFaultShowTime:1000,
    pagesize: 15,
    specialPageSize:100,
    silent: false,//  静默日志  在上线的时候设为true
    // performance:true,//在浏览器开发工具中启用对组件初始化、编译、渲染和打补丁的性能追踪。
    cookName: "WXSESSIONID",
    appID: 'wxbbd35198696b6413'
  },
  resCode: {
    success: 1000,
    bioAuthError:3000,
    sessionTimeOut:1015
  },
  functions: {
    getCookie(cname) {
      var name = cname + '='
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return undefined;
    },
    trim(str) {
      return str.replace(/\s|\xA0/g, "");
    },
    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    clearCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval=this.getCookie(name);
      if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    },
    getSearchParam(search){
      let str=search.slice(1);
      let array=str.split("&");
      let obj={};
      array.forEach((item)=>{
        let param=item.split("=");
        obj[param[0]]=param[1];
      })
      return obj;
    }
  }
}


export default config;
