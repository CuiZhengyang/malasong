import "babel-polyfill"
import "./assets/js/remResize"

import config from "./config/config"
import Vue from 'vue'
import App from './App'
import router from './router'
import  VueResource  from 'vue-resource'
import store from './store/store'
import Mint from 'mint-ui';

// 引入样式库yd
import YDUI from "vue-ydui";
import 'vue-ydui/dist/ydui.rem.css';
import 'vue-ydui/dist/ydui.base.css';
import "./assets/css/common.scss"

Vue.use(YDUI);
Vue.use(Mint);



import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

Vue.component('swipeout', Swipeout)
Vue.component('swipeout-item', SwipeoutItem)
Vue.component('swipeout-button', SwipeoutButton)


import selectPlugin from "./components/selectPlugin/selectPlugin"
Vue.component('selectPlugin', selectPlugin)

//以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;
//是否静默日志
Vue.config.silent = config.const.silent;
Vue.use(VueResource);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
