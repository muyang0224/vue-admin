<template>
  <div id="login">
      <div class="box">
     <el-radio-group class="btn1" v-model="tabPosition" style="margin-bottom: 30px;">
    <el-radio-button label="top">登录</el-radio-button>
    <el-radio-button label="right">注册</el-radio-button>
    </el-radio-group>
    

    <div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="邮箱">
        <el-input v-model="form.name"></el-input>
         </el-form-item>
         <el-form-item label="密码">
        <el-input v-model="form.name"></el-input>
         </el-form-item>
         <el-form-item class="code" label="验证码">
        <el-input v-model="form.name" width=50%></el-input>
         </el-form-item>
          <el-button class="btn3" type="primary" size="mini">获取验证码</el-button>
           <el-button class="btn2" type="primary" @click="onSubmit">登录</el-button>
    </el-form>
    </div>
    </div>
  </div>
</template>

<script>
export default {
     data() {
      return {
           tabPosition: 'top',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
}
</script>

<style lang="scss" scoped>
#login{
    padding: 0;
    height: 100vh;
    background-color:#344a5f ;
    margin:0px auto;
    overflow: hidden;
}

.box{
    padding: 20px;
    width: 400px;
    height: 500px;
    border:1px solid red;
    margin:0 auto;
   margin-top:200px ;
}
.btn1{
    margin-top:100px ;
    margin-left:140px ;
}
.btn2{
    margin-left:60px;
    width: 300px;
}
.btn3{
    display: inline-block;
    margin-left: 30px;
}
.code{
    width: 50%;
    display: inline-block;
    
}
</style>