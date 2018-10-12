

import LoginAction from "../components/Login/LoginAction"
import OderListAction from "../components/orderList/orderListAction"

import {post} from "../request/request";
import config from "../config/config"
let actions={
};

Object.assign(actions,LoginAction);

Object.assign(actions,OderListAction);

export default actions;
