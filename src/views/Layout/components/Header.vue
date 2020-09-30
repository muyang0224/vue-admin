<template>
  <div id="header">
      <div @click="navMenuState" class="pull-left header-icon" style="margin-left:20px"><svg-icon iconClass="menu" className="menu"/></div>
      
      <div class="header-close pull-right">
          <img class="pull-left" src="../../../assets/timg.jpg" alt="">
          <div class="user-info pull-left" >
               管理员
          </div>
          <div class="header-icons pull-right"><svg-icon style="margin-right:50px;margin-left:30px;margin-top:20px" iconClass="close" className="close"/></div>
          
      </div>
  </div>
</template>

<script>
import "../../../styles/config.scss"
import { onMounted, reactive, ref } from "@vue/composition-api";//vue3.api
export default {
    name:'layoutHeader',
  setup(props,{root}){
    const navMenuState=()=>{
        root.$store.commit('SET_COLLAPSE')
    }
    const photo=ref("../../../assets/timg.jpg")

    return{
    navMenuState,
    photo
}
}

}
</script>

<style lang="scss" scoped>
    // #header{
    //    width: 90%;
    //    height: 50px;
    //    position: fixed;
    //    right: 0;
    //    top: 0;
    //    left: $nav;
    //    background-color: cornflowerblue; 
    //    -webkit-box-shadow:0 3px 16px 0 #000;
    //    line-height: 50px;
    //    overflow: hidden;
    //    font-size: 14px;
    //    font-weight: 600;      
    // }
    .header-icon.pull-right{
        padding: 0 38px ;
        
         svg{
            font-size: 25px;
            cursor: pointer;
            margin-top:20px;
           
        }

    }
    .user-info{
        height:100%;
        border-right:1px solid #ededed;
        padding: 0 40px;
        line-height:45px;
    }

      img{
          width: 40px;
          height: 40px;
          margin-right:-30px ;
          border-radius: 100px;
      }
      .pull-left{
          margin-top:5px;
      }
  
</style>