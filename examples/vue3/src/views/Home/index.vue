<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane v-for="item in navArr" :key="item.name" label="User" name="first">User</el-tab-pane>
    <!--     
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
  </el-tabs>
</template>
<script setup>
import { ref } from 'vue';
// import { TabsPaneContext } from 'element-plus';
import { navArr } from '../Enum';
const activeName = ref('first');

const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-weight: 600;
  font-size: 32px;
}
</style>
