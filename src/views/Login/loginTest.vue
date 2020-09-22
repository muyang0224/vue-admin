<template>
  <div id="login">
    <div class="box">
      <div class="box-d">
        <li
          v-for="(item, index) in liList"
          :class="clickId == index ? 'li' : 'li2'"
          :key="item.id"
          @click="clickUpBtn(index)"
        >
          {{ item.name }}
        </li>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="80px" :rules="editForm" status-icon>
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
                <el-button class="btn3" type="primary" size="medium" 
                  >获取验证码</el-button
                >
              </div>
            </el-col>
          </el-row>
          <el-button class="btn2" type="danger" @click="onSubmit('form')" 
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
import {GetSms} from "../../api/login.js";//接口
export default {


setup (props,context) {

//----------------------------------表单验证
   const validateEmail = (rule, value, callback) => {
      //验证邮箱
      if (value === "") {
        callback(new Error("请正确填写邮箱"));
      } else if (!verifyEmail(value)) {
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

//----------------------------------------------------------------------------------------------

    // 点击Tab登录注册按钮
   const clickUpBtn=(index)=> {
      clickId.value = index;
      tab.value=!tab.value
      console.log(index);
      clickId.value==0?loginReg.value="登录":loginReg.value="注册"
    }
    const onSubmit=(formName)=> {
      console.log("submit!");
      context.refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
//-------------------------------------------------挂载完成后------------------------------------------------------
    onMounted(() => {
      

    });

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
.li2 {
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
