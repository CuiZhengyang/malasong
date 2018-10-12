import {post} from '../../request/request'
import config from "../../config/config";

export default {
  /**
   * 根须选项查询
   * @param context
   * @param options
   */
  getSelectList(context, options) {
    return post(config.url.getSelectList, options)
  }
}
