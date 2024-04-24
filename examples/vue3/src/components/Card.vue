<template>
  <div class="card-container">
    <div class="image-title">
      <el-image class="image-container" :src="props.config.imgUrl" fit="cover">
        <template #error>
          <div class="image-slot">
            <icon-picture />
          </div>
        </template>
      </el-image>
      <div class="title" @click.stop="">
        {{ config.name }}
      </div>
    </div>

    <div class="line" @click.stop=""></div>
    <div class="labels" @click.stop="">
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
.card-container {
  width: 300px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  @media only screen and (max-width: 640px) {
    width: 360px;
  }
  .image-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    // height: 425px;
    // background-color: #eee;
    // cursor: pointer;
    .image-container {
      width: 300px;
      height: 425px;
      background-color: #eee;
      cursor: pointer;
    }
    .title {
      width: 300px;
      overflow: hidden;
      color: rgba(0, 0, 0, 0.8);
      font-size: 14px;
      line-height: 40px;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
    }
    @media only screen and (max-width: 640px) {
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      .image-container {
        width: 40%;
        height: auto !important;
        background-color: #eee;
        cursor: pointer;
      }
      .title {
        margin-left: 5px;
        line-height: 30px;
        white-space: normal;
        text-align: left;
      }
    }
  }
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
  justify-content: center;
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
