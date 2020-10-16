import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Router from 'vue-router'
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./router/premit";
import VueCompositionApi from '@vue/composition-api';
//自定义全局组件
import "./icons/index.js";
//自定义全局方法
//import global from './utils/global.js'
//Vue.use(global)
Vue.use(VueCompositionApi)
Vue.config.productionTip = false;
Vue.use(ElementUI)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
