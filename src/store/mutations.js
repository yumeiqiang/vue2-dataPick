/**
 * Created by joojia on 17/3/23.
 */
import {
  INFO,
  CITY,
  TOKEN,
  LOGIN
} from './mutation-type.js'



export default {
  [INFO](state,detail){
    "use strict";
    state.cityInfo.code=detail.code      // 用来查询酒店的信息
  },
  [CITY](state,info){
    "use strict";
    state.infor=info       //查询到的酒店信息
    localStorage.setItem('infor',JSON.stringify(info))
  },
  [TOKEN](state,token){
    "use strict";        //用户信息
    state.Auth.token=token.token
    state.Auth.openid=token.openid
    state.Auth.code=token.code
    state.Auth.mobile=token.mobile
    state.Auth.userId=token.userId
    localStorage.setItem('token',JSON.stringify(token))
  },
  [LOGIN](state){
    "use strict";
    state.Auth.token=null
    localStorage.removeItem('token')
  }


}
