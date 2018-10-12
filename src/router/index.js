import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/store"
import config from "../config/config"
import {accessId, ShowToast} from "../request/request";
import {Toast} from 'vue-ydui/dist/lib.rem/dialog';

//fyye
// import Tables from '@/components/tables/tables'

const Login = () => import(/* webpackChunkName: "Login" */ '@/components/Login/Login');
const orderList = () => import(/* webpackChunkName: "Login" */ '@/components/orderList/orderList');
const Tables = () => import(/* webpackChunkName: "Login" */ '@/components/tables/tables');
const showDetail = () => import(/* webpackChunkName: "Login" */ '@/components/showDetail/showDetail');
Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'orderList',
      component: orderList
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables
    },
    {
      path: '/showDetail',
      name: 'showDetail',
      component: showDetail
    },
  ]
});




export default router;
