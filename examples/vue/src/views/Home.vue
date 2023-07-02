<template>
  <div style="display:flex;flex-direction: row;justify-content: left;">
    <!-- 这个得弄个媒体查询，手机网页版的 -->
    <div style="height:100%;width:200px">
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      style="height:100%"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu v-for="(item,index) in NavArr" :key="index" :index="index+''">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </template>
        
        <el-menu-item
         v-for="(v,i) in item.children" 
         :key="i" 
         :index="index+'-'+ i"
         @click="goPath(v.value)" >
          {{ v.label }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
</div>
<div style="margin-left:200px;background-color: cornsilk;">
  <router-view></router-view>
</div>
  </div>

</template>
<script>
import {NavArr} from '@/enum.js';
  export default {
    data() {
      return {
        NavArr,
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      goPath(name){
        this.$router.push({name: name})
      }
    }
  }
</script>