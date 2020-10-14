<template>
  <div>
<el-container>
  <el-aside width="200px"><LayoutNav/></el-aside>
  <el-container>
    <el-header><LayoutHeader/></el-header>
    <el-main><LayoutMain/></el-main>
  </el-container>
</el-container>
       
  </div>
</template>

<script>
import {computed} from '@vue/composition-api';
import LayoutHeader from './components/Header'
import LayoutNav from './components/Nav'
import LayoutMain from './components/Main'
export default {
    name:"layout",
    components:{LayoutHeader,LayoutNav,LayoutMain},
    setup(props,{root}){
      const menuStatus=computed(()=>root.$store.state.isCollapse);
      return{
        menuStatus
      }
    }
}
</script>

<style>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  /* .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  } */
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>