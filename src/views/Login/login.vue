<template>
  <div id="login">
    <div class="box">
      <div class="box-d">
        <li
          v-for="item in liList"
          :class="{'li2':item.current}"
          :key="item.id"
          @click="clickUpBtn(item)"
        >
          {{ item.name }}
        </li>
      </div>
      <div>
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :rules="editForm"
          status-icon
        >
          <el-form-item for="email" label="邮箱" prop="email" type="text">
            <el-input id="email" v-model="form.email" clearable type="text"></el-input>
          </el-form-item>
          <el-form-item for="password" label="密码" prop="password"  value>
            <el-input id="password" v-model="form.password" clearable type="password"></el-input>
          </el-form-item>
          <el-form-item v-if="tab" label="重复密码" prop="passwords" value>
            <el-input v-model="form.passwords" clearable type="password"></el-input>
          </el-form-item>
          <el-row :gutter="15">
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <el-form-item label="验证码" prop="clod">
                  <el-input
                    v-model="form.clod"
                    clearable
                    maxlength="6"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-button class="btn3" type="primary" size="medium" @click="getSms()" :disabled="codeButtonDisable.disableClod"
                  >{{codeButtonDisable.codeButton}}</el-button
                >
              </div>
            </el-col>
          </el-row>
          <el-button class="btn2" type="danger" @click="onSubmit('form')" :disabled="disable">{{
            login=="login"?"登录":"注册"
          }}</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {stripscript,verifyEmail,verifyPassword,verifyClod,} from "../../utils/util.js";//表单验证正则
import axios from "axios";//axios
import {getReg, GetSms,getLogin} from "../../api/login.js";//接口
import { onMounted, reactive, ref } from "@vue/composition-api";//vue3.api
import sha1 from "js-sha1";
export default {
//放置data数据，生命周期，自定义函数
/**
 * context{
 * attrs: (...)
   emit: (...)
   isServer: (...)
   listeners: (...)
   parent: (...)
   refs: (...)
   root: (...)
   slots: {}
   ssrContext: (...)
 * }
 */
  setup(props,context) {
    console.log(context)
//---------------------------------表单验证-------------------------------------------------------
//验证邮箱    
    let validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请正确填写邮箱"));
      } else if (verifyEmail(value)) {
        callback(new Error("请输入有效的邮箱"));
      } else {
        callback(); //true 验证通过
      }
    };

//验证密码   
    let validatePassword = (rule, value, callback) => {
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
    };

//验证密码
    let validatePasswords = (rule, value, callback) => {
      console.log(stripscript(value));
      //过滤后的数据
      form.passwords = stripscript(value);
      value = form.passwords;
      if (value === "") {
        callback(new Error("请再次填写密码"));
      } else if (!verifyPassword(value)) {
        callback(new Error("请填写6~12位字符的密码"));
      } else if (value !== form.password) {
        callback(new Error("密码错误，请重新填写"));
      } else {
        callback();
      }
    };

//验证验证码    
    let validateClod = (rule, value, callback) => {
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

//---------------------------------声明对象数组------------------------------------------------------
//tab
    const liList = reactive([
      { id: 1, name: "登录", current: true,type:"login" },
      { id: 2, name: "注册", current: false,type:"register" },
    ]);

//表单数据
    const form = reactive({
      email: "",
      password: "",
      clod: "",
      passwords: "",
    });

//验证表单 blur失去焦点时触发    
    const editForm = reactive({
      email: [{ validator: validateEmail, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      clod: [{ validator: validateClod, trigger: "blur" }],
    });

//获取验证码状态

    const codeButtonDisable=reactive({
         disableClod:false,           //验证码是否禁用
         codeButton:"获取验证码"       //获取验证码按钮text
    })

//-----------------------------------声明变量-----------------------------------------------

//模块值
    const login = ref("login");        //状态
    const tab = ref(false);            //tab
    const clickId = ref("");           //点击tab
    const disable=ref(true)            //提交按钮是否禁用
    const timer=ref(null)              //倒计时

//-----------------------------------声明函数-----------------------------------------------

//点击获取验证码
    const getSms=(()=>{

      if(form.email==""){              //验证邮箱
          context.root.$message.error("邮箱不能为空");
         return false
       }
       if(verifyEmail(form.email)){
         context.root.$message.error("邮箱格式有误请重新输入");
         return false
       }

       let data={                       //请求参数
       username:form.email,
       module:login.value
       }
      updateButton(true,"发送中")

//设置请求间隔
   // setTimeout(()=>{                
      GetSms(data)                      //获取验证码
      .then(response=>{
        let data=response.data;
        console.log("data:",data)
         context.root.$message({
          message:data.message,
          type: 'success'
        })
       disable.value=false              //启用登录按钮
       
       countDown(60)
      }).catch(error=>{
        updateButton(false,"获取验证码")
        console.log(error);
      })
     // },2000)
    })

//点击切换tab
    const clickUpBtn = (data) => {
     clearCountDown()
      liList.forEach(item=>{
        item.current=false
      })
       data.current=true
       login.value=data.type
       disable.value=true
       data.type=="login"?(tab.value=false):(tab.value=true)
         resetForm()
         clearCountDown()
    };

//点击提交按钮
    const onSubmit = (formName) => {
     
      console.log(login.value)
      context.refs[formName].validate((valid) => {
        if (valid) {
          login.value==="login"?submitLogin():submitReg()
          // if(login.value==="login"){
          //   submitLogin()
          // }else{
          //   submitReg()
          // }
         clickUpBtn(liList[0])
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      resetForm()          //清空表单
    };

//提交登录

    const submitLogin=(()=>{
      let data={
        username:form.email,
        password:sha1(form.password),
        code:form.clod
      }
      getLogin(data).then((response)=>{
         context.root.$message({
          message: response.data.message,
          type: 'success'
        });
        context.root.$router.push({
          name:"Home",
          // params:{
          //   id:"",
          //   username:""
          // }
        })
      }).catch(()=>{
         context.root.$message.error(data.message)
      })
    
    })

//提交注册

    const submitReg=(()=>{
      let data={
            username:form.email,
            password:sha1(form.password),
            code:form.clod,
            module:'register'
          }
       getReg(data).then((response)=>{
          console.log(response)
          context.root.$message({
          message:response.data.message,
          type:'success'
        });
          }).catch(()=>{
            context.root.$message.error(data.message);
          })
    })

//倒计时
    const countDown=((number)=>{
      //判断定时器是否存在,存在则清除
      if(timer.value){clearTime()}
      //setimeout     只执行一次
      //setInterval   一直执行
      let time=number
      timer.value=setInterval(() => {
            time--
        if (time===0) {
          clearTime()                 //清除计数器
         updateButton(false,"再次获取")
        }else{
           updateButton(true,`倒计时${time}秒`)
        }
       
      }, 1000);
    })

//---------------------------------------生命周期----------------------------------------------------

//挂载完成后
    onMounted(() => {
    
    });

//---------------------------------------封装的方法--------------------------------------------------

//清除倒计时
    const clearCountDown=(()=>{
      updateButton(false,"获取验证码")
      clearTime()                //清除计数器      

})
//重置表单
    const resetForm=()=>{
      context.refs.form.resetFields();
    }

//清除计时器
    const clearTime=()=>{
      clearInterval(timer.value); 
    }
//更新按钮状态

    const updateButton=(clod,text)=>{
      codeButtonDisable.disableClod=clod;       //修改验证码按钮状态
      codeButtonDisable.codeButton=text;         //发送验证码状态
    }

//------------------------------------------------------------------------------------------------------
    return {
      tab,
      liList,
      login,
      onSubmit,
      clickId,
      form,
      editForm,
      clickUpBtn,
      getSms,
      disable,
      codeButtonDisable,
      timer
      
    };
  },
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
 // display: inline-block;
}
li {
  display: inline-block;
  width: 80px;
  height: 36px;
  line-height: 36px;
  color: rgb(19, 20, 20);
  cursor: pointer;
  border-radius: 2px;
}
.li2 {
  display: inline-block;
  width: 80px;
  height: 36px;
  line-height: 36px;
  background-color: #5988b4;
  cursor: pointer;
  border-radius: 2px;
  color: aliceblue;
}
.grid-content bg-purple-light {
  margin: 0;
  padding: 0;
}
</style>