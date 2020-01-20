<template>
  <div class="asuka-login">
    <el-form
      class="asuka-login__content"
      :model="form"
      size="small"
      label-width="50px"
    >
      <el-form-item label="账号:">
        <el-input
          v-model="form.username"
          placeholder="请输入账号"
          type="text"
        />
      </el-form-item>
      <el-form-item label="密码:">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        />
      </el-form-item>
      <div class="asuka-login__btn">
        <el-button
          type="primary"
          size="small"
          @click="handleSubmit"
        >
          登录
        </el-button>
        <el-button
          size="small"
          @click="handleRegister"
        >
          注册
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import request from '@/utils/request';
import { setToken } from '@/utils/auth';

export default {
  name: 'Home',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      request({
        method: 'post',
        url: '/user/login',
        data: this.form,
      })
        .then((res) => {
          setToken(res.data.token);
          Message.success(res.msg);
          this.$router.push({
            name: 'home',
          }).catch(() => {});
        });
    },
    handleRegister() {
      request({
        method: 'post',
        url: '/user/register',
        data: this.form,
      }).then((res) => {
        Message.success(res.msg);
      });
    },
  },
};
</script>

<style lang="scss">
@include b('login') {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @include e('content') {
    width: 300px;
  }

  @include e('btn') {
    text-align: center;
  }
}
</style>
