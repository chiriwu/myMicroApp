<template>
  <div>
    <!-- <div class="navbar">
      <ul class="nav-menu">
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          @click="selectItem(item, index)"
          :class="{ active: activeItem === index }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div> -->
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
      <!-- <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
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
      return routes.filter((item) => item.meta && item.meta.isNav).sort((a, b) => a.meta.number - b.meta.number);
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      this.selectItem(key);
    },
    selectItem(name) {
      console.log('this.$router=', this.$router);
      // this.activeItem = index;
      // 处理导航项点击事件
      this.$router.push({ name });
    },
  },
};
</script>

<style>
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
</style>
