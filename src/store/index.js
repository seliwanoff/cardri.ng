import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
// import auth from './auth'
Vue.use(Vuex)
export default  new Vuex.Store({
    modules:{
        user:User
    }
})

