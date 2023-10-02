<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane v-for="item in navArr" :key="item.name" :label="item.label" :name="item.name">
      <!-- config:{{ item.config }} -->
      <component :is="item.components" :label="item.label"></component>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import { ref } from 'vue';
import { navArr } from '../Enum';

const activeName = ref('home');
// const navArr = ref([]);
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-weight: 600;
  font-size: 32px;
}
</style>
