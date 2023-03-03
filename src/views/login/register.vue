<!-- 登录页面 -->
<template>
  <div class="loginWrap">
    <div class="formWrap">
      <h3>Geek后台管理系统</h3>
      <el-form>
        <el-form-item>
          <el-input
            placeholder="请输入手机号"
            v-model="registerForm.phone"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            v-model="registerForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入邮箱"
            v-model="registerForm.email"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入昵称"
            v-model="registerForm.nickname"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="register" type="primary" class="btn">注册</el-button>
      <p @click="toLogin">已有账号？去登录</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { registerApi } from '../../api/userApi';

const router = useRouter();

const registerForm = reactive({
  phone: '',
  email: '',
  password: '',
  nickname: ''
});

const register = () => {
  registerApi({ ...registerForm }).then((res) => {
    if (res.code == 200) {
      ElMessage.success(res.message);
      // toLogin()
    } else {
      ElMessage.error(res.message);
    }
  });
};

const toLogin = () => {
  router.push('/login');
};
</script>
<style lang="less" scoped>
.loginWrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('../../assets/background.png') no-repeat center center;
}

.formWrap {
  position: absolute;
  width: 300px;
  height: 350px;
  background-color: rgba(255, 255, 255, 0.8);
  right: 15%;
  top: 50%;
  margin-top: -200px;
  padding: 50px;

  h3 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 40px;
  }

  p {
    color: #06f;
    font-size: 14px;
    margin-top: 5px;
    cursor: pointer;
  }
}
</style>
