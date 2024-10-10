<template>
  <div class="navContainer">
    <!-- <el-select v-model="activeName" placeholder="请选择" >
      <el-option v-for="item in navArr" :key="item.name" :label="item.label" :value="item.name"> </el-option>
    </el-select> -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane v-for="item in navArr" :key="item.name" :label="item.label" :name="item.name">
        <component :is="item.components" :label="item.label"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { navArr } from '../Enum';

const activeName = ref('home');
// const navArr = ref([]);
</script>
<style lang="less">
.el-tabs {
  padding: 20px;
  .el-tabs__header {
    height: 48px;
    color: #fff;
    line-height: 48px;
    background-color: Skyblue;
  }
}
.demo-tabs {
  padding: 0 10px;
}
.demo-tabs > .el-tabs__content {
  color: Lightsteelblue;
  font-weight: 600;
  font-size: 32px;
}
.demo-tabs > .el-tabs__header {
  padding: 0 20px;
}
</style>
