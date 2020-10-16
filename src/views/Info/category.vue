<template>
  <div class="box">
    <el-button type="danger">添加一级分类</el-button>

    <div>
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="category-wrap">
          <div class="category">
            <h4>
              <svg-icon icon-class="sign" class="svg-sign"></svg-icon>
              新闻
              </h4>
            <ul>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
            </ul>
          </div>
          </div>
        </el-col>
        <el-col :span="16">adf</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.category-wrap{
  div:first-child{
    &:before{top:20px;}
  }
}
.category{
  line-height: 44px;
  position: relative;
  cursor: pointer;
  &:before{
      content:'';
      position:absolute;
      width:32px;
      border-left:1px dotted #000;
      left: 29px;
      top: 0;
      bottom: 0;
    }
  
  h4{
    position: relative;
    padding-left:50px;
   // margin-left:20px;
   
  }
   .svg-sign{
     position: absolute;
     left: 21px;
     top: 10px;
     font-size: 17px;
      //margin-left: -40px;
      background-color:#ceebb3;
    }
  li{ 
    position: relative;
    padding-left:30px ;
    //margin-left:20px;
    list-style:none;
    
    &:before{
      content:'';
      position:absolute;
      width:32px;
      border-bottom:1px dotted #000;
      left: -10px;
      top: 22px;
    }
  }
  li,h4{
   // @include webkit(transition,all .3s ease 0s);
    &:hover{
     background-color: #f3f3f3;
    }
    
  }
}
</style>