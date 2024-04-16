<template>
  <div style="display: flex; flex-direction: row; justify-content: left; height: calc(100vh); overflow: hidden">
    <!-- 这个得弄个媒体查询，手机网页版的 -->
    <div class="navScroll">
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :default-openeds="openedArr"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
      >
        <div v-for="(item, index) in NavArr" :key="index">
          <el-submenu v-if="item.children && item.children.length" :index="item.value">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </template>
            <div>
              <el-menu-item
                v-for="(v, i) in item.children"
                :key="i"
                :index="'/home/' + item.value + '/' + v.value"
                @click="goPath(item.value, v.value)"
              >
                {{ v.label }}
              </el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item v-else :index="item.value" @click="goPath(item.value)">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
    <div ref="website" class="websiteContainer">
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
      openedArr: ['website'],
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    scrollToTop() {
      let currentPosition = this.$refs.website.scrollTop || document.body.scrollTop;
      if (currentPosition > 0) {
        window.requestAnimationFrame(this.scrollToTop);
        this.$refs.website.scrollTo(0, currentPosition - currentPosition / 8); //需要设定在可滚动元素上
      }
    },
    goPath(v1, v2) {
      const name = v2 ? `/home/${v1}/${v2}` : `/home/${v1}`;
      // this.$router.push({ path: name });

      this.$router.push({ path: name });
      this.scrollToTop();
      // this.$refs.website.scrollTo(0, 0); //需要设定在可滚动元素上
    },
  },
};
</script>
<style lang="scss" scoped>
.navScroll {
  // width: 200px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: lightgrey;
  border-radius: 10px;
}
.navScroll::-webkit-scrollbar {
  width: 3px;
}
.navScroll::-webkit-scrollbar-thumb {
  background-color: lightcoral;
}
.websiteContainer {
  width: calc(100% - 200px);
  overflow: scroll;
  background-color: lightgrey;
}
.websiteContainer::-webkit-scrollbar {
  width: 10px;
}
.websiteContainer::-webkit-scrollbar-thumb {
  background-color: lightsalmon;
}
.el-menu-vertical-demo {
  width: 150px;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100px;
}
</style>
