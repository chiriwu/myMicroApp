<template>
  <div class="header-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item v-for="(item, index) in menuItems" :key="index" :index="item.name">{{
        item.meta.title || item.name
      }}</el-menu-item>
      <div style="position: absolute; float: right; right: 0; height: 60px; line-height: 60px; margin-right: 20px">
        <el-button v-if="roleId === 0" @click="goLoginPage" type="text">登录</el-button>
        <div v-else style="display: flex; flex-direction: row">
          <span style="margin-right: 5px; color: greenyellow"><i class="el-icon-user"></i>开发者 </span>
          <el-popconfirm title="确定退出吗" @confirm="exitLogin">
            <el-button slot="reference" type="text">退出</el-button>
          </el-popconfirm>
        </div>
      </div>
    </el-menu>
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
  justify-content: center;
  border-radius: 15px 15px 15px 0;
}
</style>
