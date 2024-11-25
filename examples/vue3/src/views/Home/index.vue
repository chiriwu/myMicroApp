<template>
  <div class="navContainer">
    <div class="nav-title">
      <span class="nav-text">{{ curConfig.label }}</span>
      <el-select v-model="activeName" value-key="name" @change="changeType">
        <el-option v-for="item in navArr" :key="item.name" :label="item.label" :value="item"> </el-option>
      </el-select>
    </div>

    <component :is="curConfig.components" :label="curConfig.label"></component>

    <!-- <el-select v-model="activeName" placeholder="请选择" >
      <el-option v-for="item in navArr" :key="item.name" :label="item.label" :value="item.name"> </el-option>
    </el-select> -->
    <!-- <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane v-for="item in navArr" :key="item.name" :label="item.label" :name="item.name">
        <component :is="item.components" :label="item.label"></component>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { navArr } from '../Enum';

const curConfig = ref(navArr[0]);

const activeName = ref(curConfig.value.name);
const changeType = (v) => {
  curConfig.value = v;
};
// const navArr = ref([]);
</script>
<style lang="less" scoped>
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
.nav-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
  .nav-text {
    color: rgb(22, 101, 52);
    font-weight: 700;
    font-size: 30px;
  }
  :deep(.el-input__wrapper) {
    width: 0;
    background-color: transparent;
    box-shadow: none;
  }
  :deep(.el-input__suffix-inner > :first-child) {
    margin-left: 0;
    border: none;
    svg {
      color: green;
    }
  }
}
</style>
