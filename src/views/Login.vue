<template>
  <div class="loginContainer">
    <el-form :rules="rules" :model="loginForm" ref="loginForm">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" auto-complete="off" v-model="loginForm.username" aria-placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" auto-complete="off" v-model="loginForm.password" aria-placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-checkbox class="loginRemember" v-model="LoginCheck"></el-checkbox>
      <el-button type="primary" style="width: 100%" v-on:click="submit" native-type="submit" >登录</el-button>
    </el-form>
  </div>
</template>

<script>
// import {postKeyValueRequest} from "@/utils/api";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 123
      },
      LoginCheck: true,
      rules: {
        username: [{required: true, message: "请输入账户！", trigger: 'blur'}],
        password: [{required: true, message: "请输入密码！", trigger: 'blur'}]
      }
    }
  }, methods: {
    submit() {
      console.log(this.loginForm);
      this.$refs.loginForm.validate((valid) => {
            if (valid == true) {
              this.postKeyValueRequest('/doLogin', this.loginForm).then(resp => {
                if (resp) {
                  window.sessionStorage.setItem("user",JSON.stringify(resp.obj));
                  let path = this.$route.query.redirect;
                  //登录时判断要去首页还是 其他页面
                  this.$router.replace(path == '/' || path ==undefined ? "/home":path);
                }
              })
            }
          }
      )
      // this.$refs.loginForm.validate(function (valid) {
      //       console.log(thiss)
      //       // if (valid == true) {
      //       //   postKeyValueRequest('/doLogin', this.loginForm).then(resp => {
      //       //     if (resp) {
      //       //       alert(JSON.stringify(resp))
      //       //     }
      //       //   })
      //       // }
      //     }
      // )
    }
  }
}
</script>
<style>
.loginContainer {
  border-radius: 15px; /*圆角边框*/
  background-clip: padding-box; /*指定背景绘制区域*/
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  width: 350px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginRemember {
  text-align: left; /*靠左站*/
  margin: 0px 0px 15px 0px;
}

.loginTitle {
  text-align: center;
}

</style>