<template>
  <div id="nav">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
      >
      <template v-for="(item,index) in routers">
      <el-submenu  v-if="!item.hidden" :key="item.id" :index="index+''">
        <template slot="title">
           <svg-icon style="margin-right:20px" :iconClass="item.meta.icon" :className="item.meta.icon"/>
          <span slot="title">{{item.meta.name}}</span>
        </template>
       
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
      </el-submenu>
     </template>
    </el-menu>
   
  </div>
</template>
<script>
import '../../../styles/config.scss'
import { onMounted, reactive, ref ,computed} from "@vue/composition-api";//vue3.api
export default {
   name:"navMenu",
    setup(props,{root}){
        //data 数组
    //const isCollapse=ref(false);
    const routers=reactive(root.$router.options.routes); //获取路由数据
        console.log(root.$router.options.routes)

  /**
   * computed 监听
   */
   const isCollapse=computed(()=>{
     console.log("isCollapse:",root.$store.state.isCollapse)
     return root.$store.state.isCollapse
   });


   /**
    * 函数
    */
     const handleOpen=(key, keyPath)=> {
        console.log(key, keyPath);
      }

      const handleClose=(key, keyPath)=> {
        console.log(key, keyPath);
      }
   //打印store
   console.log("store",root.$store.state.isCollapse)
   console.log("store",root.$store.state.count)
return{
    handleOpen,
    handleClose,
    routers,
    isCollapse
}
   },

}
</script>
<style lang="scss" scoped>
    #nav{
        // position:fixed;
        // top: 0;
        // left: 0;
        // width:$nav;//$nav=250px
         height:100vh;
         background: cadetblue;
       //  @include webkit(transition,all .3s ease 0s);
    }
</style>