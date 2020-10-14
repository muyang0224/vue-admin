import Vue from "vue";
import Vuex from "vuex";
import {setToKen,setUserName,getUsername} from "../utils/app";
import {getLogin} from "../api/login.js";//接口
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse'))||false,
    to_ken:'',
    username:getUsername()||''
  },
  getters:{
    isCollapse:state=>state.isCollapse,
   // username:state=>state.username
  },
  mutations: {//同步  没有回调处理事情
    SET_COLLAPSE(state){
      console.log(3333)
      state.isCollapse=!state.isCollapse
      //html5本地存储
      sessionStorage.setItem('isCollapse',JSON.parse(state.isCollapse))
    },

    SET_TOKEN(state,value){
      state.to_ken=value
    },
    SET_USERNAME(state,value){
      state.username=value
    }
  },
  actions: {//异步  有回调处理事情
    login(content,data){
      return new Promise((resolve,reject)=>{
        //接口
        getLogin(data).then((response)=>{
          let data=response.data.data
          //普通的
        //  content.root.commit('SET_TOKEN',data.token)
         // content.root.commit('SET_USERNAME',data.username);
          setToKen(data.token);
          setUserName(data.username)
          resolve(response)
          //解构的


          resolve(response)
        }).catch(error=>{
          reject(error)
        })
      })
    }
  },
  modules: {}
});
