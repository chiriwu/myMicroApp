<template>
  <div style="display: flex; flex-direction: row; justify-content: left">
    <!-- 这个得弄个媒体查询，手机网页版的 -->
    <div style="height: 100vh; width: 200px">
      <el-menu
        :default-active="curActive"
        class="el-menu-vertical-demo"
        style="height: 100%; width: 200px"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu v-for="(item, index) in NavArr" :key="index" :index="item.value">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </template>
          <div v-if="item.children.length">
            <el-menu-item
              v-for="(v, i) in item.children"
              :key="i"
              :index="item.value + i"
              @click="goPath(item.value, v.value)"
            >
              {{ v.label }}
            </el-menu-item>
          </div>
        </el-submenu>
      </el-menu>
    </div>
    <div style="background-color: lightgrey; width: 100%">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { NavArr } from '@/enum.js';
export default {
  data() {
    return {
      NavArr,
      curActive: NavArr[0].value,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goPath(v1, v2) {
      console.log('v=', v1, v2);
      this.$router.push({ path: `/home/${v1}/${v2}` });
    },
  },
};
</script>
