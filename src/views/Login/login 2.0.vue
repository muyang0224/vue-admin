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
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      //验证邮箱
      if (value === "") {
        callback(new Error("请正确填写邮箱"));
      } else if (!verifyEmail(value)) {
        callback(new Error("请输入有效的邮箱"));
      } else {
        callback(); //true 验证通过
      }
    };
    var validatePassword = (rule, value, callback) => {
      //验证密码
      console.log(stripscript(value));
      //过滤后的数据
      this.form.password = stripscript(value);
      value = this.form.password;
      if (value === "") {
        callback(new Error("请填写密码"));
      } else if (!verifyPassword(value)) {
        callback(new Error("请填写6~12位字符的密码"));
      } else {
        callback();
      }
    };
      var validatePasswords = (rule, value, callback) => {
      //验证密码
      console.log(stripscript(value));
      //过滤后的数据ss
      this.form.passwords = stripscript(value);
      value = this.form.passwords;
      if (value === "") {
        callback(new Error("请再次填写密码"));
      } else if (!verifyPassword(value)) {
        callback(new Error("请填写6~12位字符的密码"));
        } else if (value!==this.form.password) {
        callback(new Error("密码错误，请重新填写"));
      } else {
        callback();
      }
    };
    var validateClod = (rule, value, callback) => {
      //验证验证码
      //过滤后的数据
      this.form.clod = stripscript(value);
      value = this.form.clod;
      if (value === "") {
        callback(new Error("请填写验证码"));
      } else if (!verifyClod(value)) {
        callback(new Error("请填写6位验证码"));
      } else {
        callback();
      }
    };
    return {

      tab:false,
      clickId: "", //点击tab
      loginReg:"登录",

//验证表单 blur失去焦点时触发
      editForm: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        clod: [{ validator: validateClod, trigger: "blur" }],
      },
      liList: [
        //tab
        {
          id: 1,
          name: "登录",
          current: true,
        },
        {
          id: 2,
          name: "注册",
          current: false,
        },
      ],
     // tabPosition: "top",

      form: {
        //表单
        eamil: "",
        password: "",
        clod: "",
        passwords:""
      },
    };
  },

  methods: {
    // 点击Tab登录注册按钮
    clickUpBtn(index) {
      this.clickId = index;
      this.tab=!this.tab
      console.log(index);
      this.clickId==0?this.loginReg="登录":this.loginReg="注册"
    },

    onSubmit(formName) {
      console.log("submit!");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
