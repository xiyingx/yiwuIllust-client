<!-- 用户注册组件 -->
<template>
  <div id="register">
    <!-- 负责切换注册 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">注册</span>
      </div>
      <div class="form1" @keyup.enter="register">
        <el-form ref="form" :rules="rules" :model="registerForm" label-width="15px" >
          <el-form-item prop="account">
            <el-input v-model="registerForm.name" placeholder="昵称"></el-input>
          </el-form-item>

          <el-form-item prop="email">
            <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model="registerForm.password" placeholder="密码" show-password></el-input>
          </el-form-item>

          <el-form-item prop="aginPassword">
            <el-input v-model="registerForm.aginPassword" placeholder="确认密码" show-password></el-input>
          </el-form-item>

          <el-form-item prop="checkCode">
            <el-input v-model="registerForm.checkCode" placeholder="邮箱验证码"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="register">注 册</el-button>
        </div>
        <div class="no">
          <label class="text1">
            <router-link to="/user">
              <el-link type="primary">返回登录</el-link>
            </router-link>
          </label>
        </div>

      </div>

    </el-card>
  </div>
</template>
  
<script>
    import {register} from '@/api/userApi'
export default {
  name: 'register',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: { email: "", password: "",aginPassword: "",checkCode:"",},
      
      rules: {
        name: [{ type: 'string', required: true, message: '请输入用户名', trigger: ['blur'] }, { pattern: /^[\u4e00-\u9fa5\w-]{2,12}$/, message: '长度在2~12之间,支持数字、中文、下划线', trigger: ['change', 'blur'] }],
        email: [{ type: 'string', required: true, message: '请输入邮箱', trigger: ['blur'] }, { pattern: /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/, message: '邮箱不合法', trigger: ['change', 'blur'] }],
        password: [{ type: 'string', required: true, message: '请输入密码', trigger: ['blur'] }, { pattern: /^\w{6,12}$/, message: '长度在6~12之间,包含有字母数字下划线', trigger: ['change', 'blur'] }],
        aginPassword: [{ validator: validatePass2, trigger: ['blur'] }],
        checkCode: [{ type: 'string', required: true, message: '请输入验证码', trigger: ['blur'] }, { pattern: /^\w{5}$/, message: '长度是5,必须是字母数字', trigger: ['change', 'blur'] }]
      }
    }
  }, created() {

  },
  methods: {
    register() {
      this.$refs["form"].validate(async(valid) => {
        if (valid) {
          this.registerForm.aginPassword = null;
          const {data:res} =await register(this.registerForm)
            if (res.data.isSuccess) {
              window.localStorage.setItem("token", res.data.token);
              window.localStorage.setItem("UID", res.data.UID);
              this.$store.commit("islogin", true);
              this.$parent.$parent.reload();
              this.$router.push("/index");
            } else {
              this.$message.error(res.code.msg);
            }
        } else {
          return false;
        }
      })
    },

  },
}
</script>
  
<style scoped>
* {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
}

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