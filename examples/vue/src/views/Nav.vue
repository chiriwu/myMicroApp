<template>
  <div class="header-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgb(241,249,243)"
      text-color="rgb(9,9,11)"
      active-text-color="#ffd04b"
    >
      <el-menu-item v-for="(item, index) in menuItems" :key="index" :index="item.name">{{
        item.meta.title || item.name
      }}</el-menu-item>
    </el-menu>
    <div class="login-container">
      <el-button v-if="roleId === 0" @click="goLoginPage" type="text">登录</el-button>
      <div v-else style="display: flex; flex-direction: row">
        <el-dropdown>
          <span class="el-dropdown-link"> 开发者<i class="el-icon-arrow-down el-icon--right"></i> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button @click="exitLogin" type="text">退出</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { checkMobile } from '@/utils/tools.js';

export default {
  data() {
    return {
      activeItem: 0,
      activeIndex: 'home',
    };
  },
  computed: {
    menuItems() {
      const routes = this.$router.options.routes;
      this.$store.commit('getRoleId');
      const roleId = this.$store.state.roleId;
      const isMobile = checkMobile();
      return routes
        .filter((item) => item.meta && item.meta.roleId <= roleId && !item.meta.isLoginPage)
        .filter((item) => {
          if (isMobile && item.meta.hide) {
            return false;
          }
          return true;
        })
        .sort((a, b) => a.meta.number - b.meta.number);
    },
    roleId() {
      return this.$store.state.roleId;
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      this.selectItem(key);
    },
    selectItem(name) {
      // this.activeItem = index;
      // 处理导航项点击事件
      this.$router.push({ name });
    },
    goLoginPage() {
      this.$router.push({ path: '/login' });
    },
    async exitLogin() {
      await this.$store.dispatch('clearCookies', 0); // 角色0
      this.$router.push({ path: '/home' });
    },
  },
};
</script>

<style scoped>
.header-container {
  /* height: $header-height; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(241, 249, 243);
}
ul.nav-menu {
  display: flex;
  list-style-type: none;
}

ul.nav-menu li {
  margin-right: 10px;
  cursor: pointer;
}

ul.nav-menu li.active {
  font-weight: bold;
}
.el-menu-demo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 15px 15px 15px 0;
}
.login-container {
  height: 60px;
  margin-right: 20px;
  line-height: 60px;
}
</style>
