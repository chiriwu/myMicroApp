<template>
  <div class="login">
    <h2>用户登录</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">用户名：</label>
        <input type="text" id="username" v-model="username" placeholder="admin" required />
      </div>
      <div class="form-group">
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="password" placeholder="111" required />
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
import { ROLE_LIST } from '@/constant';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      await this.$store.dispatch('setCookies', ROLE_LIST.NORMAL);
      this.$router.push({ path: '/home' });
      // 处理登录逻辑
      // console.log('用户名：', this.username);
      // console.log('密码：', this.password);
    },
  },
};
</script>

<style>
.login {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  background-color: #b2dfee;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: inline-block;
  width: 80px;
  margin-right: 10px;
  text-align: right;
}

input[type='text'],
input[type='password'] {
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button[type='submit'] {
  display: block;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button[type='submit']:hover {
  background-color: #0069d9;
}
</style>
