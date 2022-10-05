<!-- 用户 登录注册组件 -->
<template>
  <div id="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">登录</span>
      </div>
      <div class="form1" @keyup.enter="login">
        <el-form ref="form" :model="loginForm" label-width="15px" :rules="rules">
          <el-form-item prop="email">
            <el-input v-model="loginForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="checkCode">
            <el-input v-model="loginForm.checkCode" placeholder="验证码"></el-input>
          </el-form-item>

        </el-form>
        <el-image :src="coedSrc" @click="setCodeImg" class="code"></el-image>
        <div>
          <el-button type="primary" @click="login" class="b1">登 录</el-button>
        </div>
        <div class="no">
          <label class="text1">
            <router-link to="/user/register">
              <el-link type="primary">没有账号？注册</el-link>
            </router-link>
          </label>
        </div>

      </div>

    </el-card>
  </div>
</template>

<script>
  import {login} from '@/api/userApi'
  import http from '@/utils/http';
import { mapMutations } from 'vuex';
export default {
  name: 'login',
  data() {
    return {
      loginForm: { email: '', password: '',checkCode:'',userType:'普通用户'},
      coedSrc: '',
      rules: {
        email: [{ type: 'string', required: true, message: '请输入邮箱', trigger: ['blur'] }, { pattern: /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/, message: '邮箱不合法', trigger: ['change', 'blur'] }],
        password: [{ type: 'string', required: true, message: '请输入密码', trigger: ['blur'] }, { pattern: /^\w{6,12}$/, message: '长度在6~12之间,包含有字母数字下划线', trigger: ['change', 'blur'] }],
        checkCode: [{ type: 'string', required: true, message: '请输入验证码', trigger: ['blur'] }, { pattern: /^\w{5}$/, message: '长度是5,必须是字母数字', trigger: ['change', 'blur'] }]
      }
    }
  }, created() {
    this.setCodeImg();
    
  },
  methods: {
    ...mapMutations("user",["setIsLogin"]),
    ...mapMutations("user",["setUserID"]),
     login() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          const {data:res} = await login(this.loginForm);
          console.log(res);
            if (res.data.isSuccess) {
              window.localStorage.setItem("token", res.data.token);
              // this.$store.commit("islogin", true);
              this.setIsLogin(true)
              window.localStorage.setItem("UID", res.data.UID);
              this.setUserID(res.data.UID)
              // 调用父组件刷新
              this.$parent.$parent.reload();
              this.$router.push("/index");
            } else {
              this.$message.error(res.code.msg);
            }
        } else {
          return false;
        }
      });
    },
    async setCodeImg() {
      http.get("/codes").then((res) => {
        this.coedSrc = 'data:image/png;base64,' + res.data.data;//通过base64编码显示图片
      });
    },

  }
}
</script>
  
<style scoped>
.no {
  height: 30px;
  text-align: right;
}

#login {
  width: 500px;
  height: 500px;
}

.clearfix {
  text-align: center;
}

.b1 {
  width: 200px;
  bottom: 20px;
}

/* .img{
      width: 200px;
    } */
.text1 {
  color: red;
}

.form1 {
  text-align: center;
}

.title {
  font-size: 25px;
}
</style>