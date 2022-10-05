import Vue from 'vue'
import Vuex from 'vuex'
import user from '../store/modules/user'
//设置一个vuex的公共资源器
Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    user
  },
})
export default store
