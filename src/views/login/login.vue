<!-- 登录页面 -->
<template>
  <div class="loginWrap">
    <div class="formWrap">
      <h3>Geek后台管理系统</h3>
      <el-form>
        <el-form-item>
          <el-input
            placeholder="请输入用户名"
            v-model="loginForm.userName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="login" type="primary" class="btn">登录</el-button>
      <p @click="toRegister()">没有账号？去注册</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { loginApi } from '../../api/userApi';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginForm = reactive({
  userName: '',
  password: ''
});

const login = () => {
  loginApi({
    username: loginForm.userName,
    password: loginForm.password
  }).then((res) => {
    if (!res.status) {
      ElMessage.error(res.message);
    } else {
      Cookies.set('token', res.data.Magic, { expires: 7 });
      Cookies.set('userId', res.data.user.id, { expires: 7 });
      Cookies.set('role', res.data.user.role, { expires: 7 });
      ElMessage.success('登录成功');
      router.push('/homeView');
    }
  });
};

const toRegister = () => {
  console.log(1);
  router.push('/register');
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
  height: 250px;
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
