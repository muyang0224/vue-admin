import Vue from 'vue';
import Svg from './Svg.vue'
//自定义全局组件
Vue.component('svg-icon',Svg);

/**
 * 解析文件
 * require.context,读取指定目录的所有文件
 * 参数：
 * 第一个：目录
 * 第二个：是否遍历子集目录
 * 第三个：定义遍历文件规则
 */
const req=require.context('./svg',false,/\.svg$/)//正则里面表示结尾
const requireAll=requireContext=>{
    return requireContext.keys().map(requireContext)
}
requireAll(req)