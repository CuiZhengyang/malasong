import Vue from "vue"
import {Toast} from "vue-ydui/dist/lib.rem/dialog/index";
import config from "../config/config"
import router from "../router/index"

export const accessId = config.functions.getSearchParam(location.search).accessId;

/**
 * 公用函数showToast
 * @param msg  要显示的信息
 * @param times 要显示的时长，单位：毫秒 默认是1秒，非彼条参数
 * @returns {*}
 * @constructor
 */
export const ShowToast=(msg,times=config.const.toastDeFaultShowTime)=> Toast({mes: msg, timeout: times});

function request(userConfig) {

  let {method, url, data = {}, headers, responseType, credentials, emulateHTTP, emulateJSON, before, uploadProgress, downloadProgress} = userConfig;

  data=Object.assign(data,{accessId});
  let httpdConfig = {
    params: data
  }

  // headers	Object	Headers object to be sent as HTTP request headers
  !!headers && Object.assign(httpdConfig, {headers});
  // responseType	string	Type of the response body (e.g. text, blob, json, ...)
  !!responseType && Object.assign(httpdConfig, {responseType});
  // credentials	boolean	Indicates whether or not cross-site Access-Control requests should be made using credentials
  !!credentials && Object.assign(httpdConfig, {credentials});
  // emulateHTTP	boolean	Send PUT, PATCH and DELETE requests with a HTTP POST and set the X-HTTP-Method-Override header
  !!emulateHTTP && Object.assign(httpdConfig, {emulateHTTP});
  // emulateJSON	boolean	Send request body as application/x-www-form-urlencoded content type
  !!emulateJSON && Object.assign(httpdConfig, {emulateJSON});
  // before	function(request)	Callback function to modify the request object before it is sent
  !!before && Object.assign(httpdConfig, {before});
  // uploadProgress	function(event)	Callback function to handle the ProgressEvent of uploads
  !!uploadProgress && Object.assign(httpdConfig, {uploadProgress});
  // downloadProgress	function(event)	Callback function to handle the ProgressEvent of downloads
  !!downloadProgress && Object.assign(httpdConfig, {downloadProgress});

  return new Promise((resolve, reject) => {

    let errorCallback = (response) => {
      reject();
      ShowToast('请检查您的网络');
    }

    let redereact = () => {
      let accessId = config.functions.getSearchParam(location.search).accessId;
      switch (accessId) {
        case config.accessId.school:
          router.push("/loginSchool");
          break;
        default:
          router.push("/")
      }
    }

    if (method === 'POST') {
      let params = httpdConfig.params;
      delete httpdConfig.params;
      Vue.http.post(url, params, httpdConfig).then(function (response) {
        if (response.data.code == config.resCode.sessionTimeOut) {
          redereact();
        }
        else{
          resolve(response);
        }
      }, errorCallback)
    }
    else {
      Vue.http.get(url, httpdConfig).then(function (response) {
        if (response.data.code == config.resCode.sessionTimeOut) {
          redereact();
        }
        else{
          resolve(response);
        }

      }, errorCallback)
    }
  })

}


export const pathDecorator = (path) => {
  let obj = {}
  if (!path) {
    return null;
  }
  else if (typeof path == "string") {
    obj = {
      path: path,
      query: {accessId}
    }
  }
  else if (typeof path == 'object' && !!path.path && !path.query) {
    Object.assign(obj, path, {query: {accessId}})
  }
  else if (typeof path == 'object' && !!path.path && !!path.query) {
    path.query.accessId = accessId;
    obj = path;
  }
  return obj;
}


export const get = (url, data, config = {}) => request(Object.assign({url, data}, config));
export const post = (url, data, config = {}) => request(Object.assign({method: 'POST', url, data}, config));


export const beforeEnterRouter = (title = "", rightBar = "", rightCallback = null, rightBarImg = null) => {
  document.title = title;
  const app = UP.W.App;
  app.onPluginReady(() => {
    app.setNavigationBarTitle(title)
    /**
     * 设置窗口右侧按钮
     * @param title 图标标题
     * @param image 图标文件
     * @param handler 点击回调函数
     */
    if (!!rightCallback) {
      app.setNavigationBarRightButton(rightBar, rightBarImg, rightCallback)
    }
    else {
      app.setNavigationBarRightButton("", null, null)
    }
  })
}


// Config
//
// Parameter	Type	Description
// url	string	URL to which the request is sent
// body	Object, FormData, string	Data to be sent as the request body

// params	Object	Parameters object to be sent as URL parameters
// method	string	HTTP method (e.g. GET, POST, ...)

// timeout	number	Request timeout in milliseconds (0 means no timeout)


//
// Response
//
// A request resolves to a response object with the following properties and methods:
//
//   Property	Type	Description
// url	string	Response URL origin
// body	Object, Blob, string	Response body
// headers	Header	Response Headers object
// ok	boolean	HTTP status code between 200 and 299
// status	number	HTTP status code of the response
// statusText	string	HTTP status text of the response
// Method	Type	Description
// text()	Promise	Resolves the body as string
// json()	Promise	Resolves the body as parsed JSON object
// blob()	Promise	Resolves the body as Blob object


