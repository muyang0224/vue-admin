
// import {login} from "../api/login.js"
// import { setToKen, setUserName } from "../utils/app.js"
// const app={
//   state: {
//     isCollapse:JSON.parse(sessionStorage.getItem('isCollapse'))||false,
//     to_ken:'',
//     username:''
//   },
//   getters:{
//     isCollapse:state=>state.isCollapse
//   },
//   mutations: {//同步  没有回调处理事情
//     SET_COLLAPSE(state){
//       console.log(3333)
//       state.isCollapse=!state.isCollapse
//       //html5本地存储
//       sessionStorage.setItem('isCollapse',JSON.parse(state.isCollapse))
//     },
//     SET_TOKEN(state,value){
//       state.to_ken=value
//     },
//     SET_USERNAME(state,value){
//       state.username=value
//     }
//   },
//   actions: {//异步  可以回调处理事情
//     login(content,data){
//             return new Promise((resolve,reject)=>{
//               //接口
//               getLogin(data).then((response)=>{
//                 let data=response.data.data
//                 //普通的
//                 content.commit('SET_TOKEN',data.token)
//                 content.commit('SET_USERNAME',data.username);
//                 setToKen(data.token);
//                 setUserName(data.username)
//                 resolve(response)
//                 //解构的


//                 resolve(response)
//               }).catch(error=>{
//                 reject(error)
//               })
//             })
//           }
//   },
  
//   modules: {}

// }
// export default app;