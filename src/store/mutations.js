/**
 * Created by joojia on 17/3/23.
 */
import {
  INFO,
  CITY,
  TOKEN
} from './mutation-type.js'



export default {
  [INFO](state,detail){
    "use strict";
    state.cityInfo=detail
  },
  [CITY](state,info){
    "use strict";
    state.infor=info
  },
  [TOKEN](state,token){
    "use strict";
    state.token=token
  }


}
