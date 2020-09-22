/**
 * 拦截器
 */
import axios from "axios";
import { Message } from "element-ui";
//手把手撸码前端请求地址，http://www.web-jshtml.cn/productApi
//创建axios，赋给变量service
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/api";
const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000,//请求超时
});

//添加请求拦截器
service.interceptors.request.use(

  function(config) {
    //在发送请求之前做些什么
    //后台需要前端这边传相关的参数(在请求头添加参数)
    //Tokey，userId
    //业务需求
    console.log(config.headers)


    //最终目的不是在请求头添加参数
    config.headers['Tokey']='111111'





    return config;
  },
  function(error) {
    //对请求错误做些什么
    return Promise.reject(error);
  }
);

//添加响应拦截器
service.interceptors.response.use(
  (response) => {
    //对响应数据做些什么
    let data = response.data;
    console.log(response);
    if (data.resCode !== 0) {
      //alert(111);
      Message.error(data.message);
       return Promise.reject(data);
    }else{
      //return response;
      return Promise.resolve(response)
    }

    
  },
  function(error) {
    //对响应错误做些什么
    return Promise.reject(error);
  }
);

export default service;
