/**
 * Created by joojia on 17/3/15.
 */
import {httpReq} from '../plugins/base'

//
//
if (process.env.NODE_ENV == 'development'){
  /*
  *
  * 获取首页数据*/

  var getInfo= () =>{
    "use strict";
    return httpReq('hotelService/cityList')
  };
  var search=(data)=>{
    return httpReq('hotelService/searchHotel',{urlParams:data})
  }

}
export {
  getInfo,search
}
