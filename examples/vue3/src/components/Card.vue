<template>
  <div class="container">
    <el-image style="width: 300px; height: 425px; background-color: #eee" :src="props.config.imgUrl" fit="cover">
      <template #error>
        <div class="image-slot">
          <icon-picture />
        </div>
      </template>
    </el-image>
    <div class="title">
      <span>{{ config.name }}</span>
    </div>
    <div class="line"></div>
    <div class="labels">
      <div>
        <el-icon :size="18" color="#409EFC"><List /></el-icon>
        <span>{{ filterDate(config.createdAt) }}</span>
      </div>
      <div>
        <el-icon :size="15" color="#409EFC"><View /></el-icon>
        <span>{{ config.pv }}</span>
      </div>
      <div>
        <el-icon :size="18" color="#409EFC"><Document /></el-icon>
        <span>{{ config.category }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { Picture as IconPicture } from '@element-plus/icons-vue';
const props = defineProps(['config']);
function filterDate(d) {
  const date = new Date(d);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
</script>
<style lang="less" scoped>
.container {
  width: 300px;
  background-color: white;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 40px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #eee;
}
.labels {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  color: #222;
  font-size: 13px;
  /* width: 300px; */
  div:not(:first-child) {
    margin-left: 8px;
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    span {
      margin-left: 2px;
      line-height: 13px;
    }
  }
}
</style>
