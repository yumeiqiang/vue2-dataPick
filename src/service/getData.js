/**
 * Created by joojia on 17/3/15.
 */
import {httpReq,conf} from '../plugins/base'

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
  var login=(data)=>{
    return httpReq('user/login',{method:'post',data:data})
  }
  var getCode=(data)=>{
    "use strict";
    return httpReq('sms',{method:'post',data:data})
  }
}
export {
  getInfo,search,login,getCode
}
