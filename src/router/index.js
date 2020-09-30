import { forEachChild } from "typescript";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//引入布局组件
import Layout from "@/views/Layout/index.vue"
export default new VueRouter({ 
  routes:[
  {
    path: "/",
    redirect:"/login",
    hidden:true,
    meta:{
      name:"主页"

    }
  },
  {
    path:"/login",
    name:"Login",
    hidden:true,
    meta:{
      name:"登录"
    },
    component:() =>
    import("../views/Login/login.vue")
  },
  {
    path:"/home",
    name:"Home",
    meta:{
      name:"控制中心",
      icon:"yibiao"
    },
    component:Layout,
    
   
    children:[
      {
        path:"/home",
        name:"Home",
        meta:{
          name:"首页",
          icon:""
        },
        component:() =>
        import("../views/Home/home.vue"),
      },
  
    ]
  },
  {
    path:"/info",
    name:"Info",
    meta:{
      name:"信息管理",
      icon:"men"
    },
    component:Layout,
    children:[
      {
        path:"/infoindex",
        name:"InfoIndex",
        meta:{
          name:"信息列表"
        },
        component:() =>
        import("../views/Info/index.vue"),
      },
      {
        path:"/infoCategory",
        name:"InfoCategory",
        meta:{
          name:"信息分类"
        },
        component:() =>
        import("../views/Info/category.vue"),
      }
    ]
  },
  {
    path:"/user",
    name:"User",
    meta:{
      name:"用户管理",
      icon:"person"
    },
    component:Layout,
    children:[
      {
        path:"/userList",
        name:"UserList",
        meta:{
          name:"列表"
        },
        component:() =>
        import("../views/User/userList.vue"),
      },
     
    ]
  }
]

});

 