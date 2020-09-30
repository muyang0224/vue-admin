<template>
  <div id="login">
    <div class="box">
      <div class="box-d">
        <li
          v-for="item in liList"
          :class="{'li':item.current }"
          :key="item.id"
          @click="clickUpBtn(item)"
        >
          {{ item.name }}
        </li>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="80px" :rules="editForm" status-icon >
          <el-form-item label="邮箱" prop="email" type="text">
            <el-input v-model="form.email" clearable type="text"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" value="">
            <el-input v-model="form.password" clearable></el-input>
          </el-form-item>
           <el-form-item v-if="tab" label="重复密码" prop="passwords" value="">
            <el-input v-model="form.passwords" clearable></el-input>
          </el-form-item>
          <el-row :gutter="15">
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <el-form-item label="验证码" prop="clod">
                  <el-input v-model="form.clod" clearable maxlength="6"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-button  :disabled="disable" class="btn3" type="primary" size="medium"  @click="getCode()"
                  >{{getcode}}</el-button
                >
              </div>
            </el-col>
          </el-row>
          <el-button class="btn2" type="danger" @click="onSubmit('form')" :disabled="disableSum"
            >{{loginReg}}</el-button
          >
        </el-form>
      </div>
    </div>
    
  </div>
</template>

<script>
import {
  stripscript,
  verifyEmail,
  verifyPassword,
  verifyClod,
} from "../../utils/util.js";
//import comReg from './component/reg.vue'
import { reactive, toRefs,onMounted, ref} from '@vue/composition-api';
import axios from "axios";//axios
import {getLogin, GetSms,getReg} from "../../api/login.js";//接口
export default {

setup (props,context) {

//----------------------------------表单验证
   const validateEmail = (rule, value, callback) => {
      //验证邮箱
      if (value === "") {
        callback(new Error("请正确填写邮箱"));
      } else if (verifyEmail(value)) {
        callback(new Error("请输入有效的邮箱"));
      } else {
        callback(); //true 验证通过
      }
    }
    const validatePassword = (rule, value, callback) => {
      //验证密码
      console.log(stripscript(value));
      //过滤后的数据
      form.password = stripscript(value);
      value = form.password;
      if (value === "") {
        callback(new Error("请填写密码"));
      } else if (!verifyPassword(value)) {
        callback(new Error("请填写6~12位字符的密码"));
      } else {
        callback();
      }
    }
      const validatePasswords = (rule, value, callback) => {
      //验证密码
      console.log(stripscript(value));
      //过滤后的数据ss
      form.passwords = stripscript(value);
      value = form.passwords;
      if (value === "") {
        callback(new Error("请再次填写密码"));
      } else if (!verifyPassword(value)) {
        callback(new Error("请填写6~12位字符的密码"));
        } else if (value!==form.password) {
        callback(new Error("密码错误，请重新填写"));
      } else {
        callback();
      }
    }
    const validateClod = (rule, value, callback) => {
      //验证验证码
      //过滤后的数据
      form.clod = stripscript(value);
      value = form.clod;
      if (value === "") {
        callback(new Error("请填写验证码"));
      } else if (!verifyClod(value)) {
        callback(new Error("请填写6位验证码"));
      } else {
        callback();
      }
    };
//--------------------------------------声明对象数组----------------------------------------------------------     
 
    //登录注册Tab
 const  liList = reactive([
        {id: 1,name: "登录",current: true,type:"login"},
        {id: 2,name: "注册",current: false,type:"register"},
      ])
    
    //表单验证规则
 const  editForm=reactive( {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        clod: [{ validator: validateClod, trigger: "blur" }],
      })
    
    //表单数据  
  const form=reactive({
        email: "",
        password: "",
        clod: "",
        passwords:""
      })

//---------------------------------------声明变量------------------------------------------------------------
  const tab=ref(false)
  const clickId=ref("")//点击tab
  const loginReg=ref("登录")
  const disable=ref(false)
  const getcode=ref("获取验证码")
  const timer=ref(null)
  const disableSum=ref(true)

//----------------------------------------------------------------------------------------------

// 点击Tab登录注册按钮
   const clickUpBtn=(data)=> {
     liList.forEach(item => {
        item.current=false
      });
        data.current=true
        loginReg.value=data.name
        data.type=="login"?tab.value=false:tab.value=true
        context.refs.form.resetFields()
        clearInterval(timer.value)
        updataCode({
            text:"获取验证码",
            boo:false
          })
    }


//提交表单
    const onSubmit=(formName)=> {
      console.log("submit!");
      context.refs[formName].validate((valid) => {
        if (valid) {
          loginReg.value=="登录"?getLogins():getRegs()

           clickUpBtn(liList[0])
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }

//获取验证码

    const getCode=()=>{

      if(verifyEmail(form.email)){
        context.root.$message.error("邮箱格式有误");
        return false
      }
      let data={
        username:form.email
      }
      GetSms(data).then((response)=>{
         context.root.$message({
          message: response.data.message,
          type: 'success'
        });
        getTimer(60)
        disableSum.value=false

      }).catch(()=>{
        context.root.$message.error(response.data.message);

      })
    
    }

//登录
 const getLogins=()=>{
     let data={
     username:form.email,
     password:form.password,
     code:form.clod
   }
   getLogin(data).then((response)=>{
      context.root.$message({
          message: response.data.message,
          type: 'success'
        });
   }).catch((error)=>{
     context.root.$message.error(response.data.message);

   })

}
//注册 
 const getRegs=()=>{
   let data={
     username:form.email,
     password:form.password,
     code:form.clod,
     module:'register'
   }
   getReg(data).then((response)=>{
      context.root.$message({
          message: response.data.message,
          type: 'success'
        });
   }).catch((error)=>{
     context.root.$message.error(response.data.message);

   })
 }
//计时器

const getTimer=(number)=>{
  let time=number
  if(timer.value){clearInterval(timer.value)}
  timer.value=setInterval(() => {
          time--
      if(time===0){
          updataCode({
            text:`点击重新获取`,
            boo:false
          })
          clearInterval(timer.value); 
      }else{
          console.log(time)
          // getcode.value=`倒计时${time}秒`
          // disable.value=true
          updataCode({
            text:`倒计时${time}秒`,
            boo:true
          })
    }
  },1000);
 

}


//-------------------------------------------------挂载完成后------------------------------------------------------
    onMounted(() => {
      
    });

//------------------------------------------------封装-----------------------------------------------------------
//验证码按钮状态
  const updataCode=(code)=>{
    getcode.value=code.text
    disable.value=code.boo
  }


//---------------------------------------------------------------------------------------------------------------
      return {
       liList,
       editForm,
       form,
       tab,
       clickId,
       loginReg,
       clickUpBtn,
       onSubmit,
       getCode,
       validateEmail,
       getcode,
       disable,
       timer,
       disableSum,
       getLogins,
       getRegs
    }
  


    }
 
  
};
</script>

<style lang="scss" scoped>
#login {
  padding: 0;
  height: 100vh;
  background-color: #344a5f;
  margin: 0px auto;
  overflow: hidden;
}

.box {
  padding: 20px;
  width: 400px;
  height: 500px;
  // border:1px solid red;
  margin: 0 auto;
  margin-top: 200px;
  text-align: center;
  .box-d {
    margin-top: 50px;
    margin-bottom: 20px;
    width: 100%;
    margin-left: 50px;
  }
}
.btn1 {
  margin-top: 100px;
  margin-left: 140px;
}
.btn2 {
  margin-left: 77px;
  width: 322px;
}
.btn3 {
  width: 120px;
}
.code {
  margin-left: -80px;
  width: 50%;
  display: inline-block;
}
.li {
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  background: cornflowerblue;
  color: aliceblue;
  cursor: pointer;
  border-radius: 5px;
}
li {
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  background-color: #344a5f;
  cursor: pointer;
  border-radius: 5px;
}
.grid-content bg-purple-light {
  margin: 0;
  padding: 0;
}
</style>
