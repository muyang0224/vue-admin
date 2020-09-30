<template>
  <div id="main">
     <router-view/>
  </div>
</template>

<script>
import "../../../styles/config.scss"
export default {

}
</script>

<style lang="scss" scoped>
    #main{
        // position: fixed;
        // left: $nav;
        // top:75px;
        // right: 0;
        // bottom: 0;
        // border: 0.1px solid #000;
        // //padding: 0px 0 0 250px;
        // border-bottom:none;
        // -webkit-box-sizing: border;
        // background: #ceebb3;
        // margin: 20px;
        height:100%;
        background: #ceebb3;
    }
</style>