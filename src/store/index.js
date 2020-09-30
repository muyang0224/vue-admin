import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse:false,
    count:10
  },
  getters:{
    count: state=>state.count+10
  },
  mutations: {
    SET_COLLAPSE(state){
      console.log(3333)
      state.isCollapse=!state.isCollapse
      console.log(state.isCollapse)
    },

    SET_COUNT(state,value){
      state.count=value
      console.log(state.count)
    }
  },
  actions: {},
  modules: {}
});
