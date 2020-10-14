import router from "./index";
import {getToKen,removeToKen,removeUserName} from "../utils/app.js"
import store from "../store/index"
const whiteRouter=['/login'];//indexOf方法，判断数组中是否存在指定的某个对象
//路由守卫
router.beforeEach((to,from,next)=>{
    console.log("to",to)
    if(getToKen()){

        if(to.path==='/login'){
            removeToKen();
            removeUserName()
            store.commit("SET_TOKEN",'')
            store.commit("SET_USERNAME",'')
            next();
        }else{
            next();
        }
        next();
        //路由动态添加，分配菜单，每个角色分配不同的菜单
        console.log('存在')
    }else{
        //next('/login')
        console.log('不存在')
        if(whiteRouter.indexOf(to.path)!==-1){
            next();
        }else{
            next('/login')
        }
    }
    //console.log(to)//进入的页面（下一个页面）
    //console.log(from)//离开之前的页面（上一个）
    //console.log(next)
   // next()//to
    //token
    /**
     * 1.直接进入index的时候，参数to被改变成了"/index",触发路由指向，就会跑beforEach
     * 2.再一次next 指向了login。再次发生了路由指向，再跑beforeEach，参数的to被改变成了"/login"
     */
  
  })