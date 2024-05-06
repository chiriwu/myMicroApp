<template>
  <div class="content-container" :class="{ 'is-inner': isQiankun }" id="website-content">
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
        <template v-for="(item, index) in NavArr">
          <el-submenu v-if="item.children && item.children.length" :index="item.value" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.label }}</span>
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
          <el-menu-item v-else :index="item.value" @click="goPath(item.value)" :key="(index = 'direct')">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="footer-collapse" @click="expandMenu">
        <i v-if="isCollapse" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
      </div>
    </div>
    <div ref="website" class="websiteContainer">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { NavArr } from '@/enum.js';
import { checkMobile } from '@/utils/tools.js';
export default {
  data() {
    return {
      NavArr,
      curActive: NavArr[0].value,
      openedArr: ['website'],
      isCollapse: false,
      isQiankun: false,
    };
  },
  created() {
    if (checkMobile()) {
      this.isCollapse = true;
    }
  },
  mounted() {
    if (document.querySelector('#website-content').getBoundingClientRect() > 100) {
      this.isQiankun = true;
    }
  },
  methods: {
    expandMenu() {
      this.isCollapse = !this.isCollapse;
    },
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
.content-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: calc(100vh - 60px);
  overflow: hidden;
}
.is-inner {
  height: calc(100vh - (136px));
}
.navScroll {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 0 10px 10px 10px;
}
.navScroll::-webkit-scrollbar {
  width: 3px;
}
.navScroll::-webkit-scrollbar-thumb {
  background-color: lightcoral;
}
.websiteContainer {
  flex-grow: 1;
  width: calc(100% - 200px);
  overflow-y: scroll;
  background-color: #b2dfee;
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

.footer-collapse {
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: white;
  font-size: 26px;
}
.el-menu.el-menu--collapse {
  width: 64px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
