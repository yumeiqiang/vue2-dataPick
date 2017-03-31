/**
 * Created by joojia on 17/3/23.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './action.js'
import getters from './getters.js'


Vue.use(Vuex)
const state={
  cityInfo:{
    code:'',  // city code
    name:''  //hotel name
  },
  // hotel info
  infor:{

  },
  Auth:{
    token:'',
    openid:'',
    mobile:'',
    userId:'',
    code:''
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
