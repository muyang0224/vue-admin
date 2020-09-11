import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

export default new VueRouter({ 
  routes:[
  {
    path: "/",
    redirect:"/login"
  },
  {
    path:"/login",
    name:"Login",
    component:() =>
    import("../views/Login/login.vue")
  }
]

});

 