import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/store"
import config from "../config/config"
import {accessId, ShowToast} from "../request/request";
import {Toast} from 'vue-ydui/dist/lib.rem/dialog';

const Login = () => import(/* webpackChunkName: "Login" */ '@/components/Login/Login');
const orderList = () => import(/* webpackChunkName: "Login" */ '@/components/orderList/orderList');
Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'orderList',
      component: orderList
    }
  ]
});




export default router;
