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
    <div class="labels">
      <span>
        <el-icon :size="20"><List /></el-icon>
        {{ filterDate(config.createdAt) }}
      </span>
      <span>
        <el-icon :size="20" color="#409EFC"><View /></el-icon>
        {{ config.pv }}
      </span>
      <span>
        <el-icon :size="20" color="#409EFC"><Document /></el-icon>
        {{ config.category }}
      </span>
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
<style scoped>
.title {
  font-size: 14px;
  text-align: center;
}
</style>
