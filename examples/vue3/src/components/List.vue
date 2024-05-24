<template>
  <div class="container">
    <div class="search">
      <el-input placeholder="请输入内容" style="width: 400px" @keyup.enter="search" v-model="searchWord">
        <template #append>
          <el-button type="primary" @click="search"> 搜索 </el-button>
        </template>
      </el-input>
    </div>
    <div class="cardContainer" v-loading="isLoading">
      <Card
        v-for="(item, index) in dataList"
        :key="index"
        class="cardItem"
        :config="item"
        @click="jumpUrl(item.id)"
      ></Card>
      <div v-if="!dataList.length" style="margin: 50px 0 20px 0">暂无数据</div>
    </div>
    <el-pagination
      v-if="dataList.length"
      medium
      background
      layout="prev, pager, next"
      :total="total"
      class="mt-4"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      v-model:current-page="currentPage"
    />
  </div>
</template>
<script setup lang="ts">
import Card from '@/components/Card.vue';
import { isEmpty } from '../utils/func.js';
import { defineProps, ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps(['label']);
const global = inject('global');
let dataList = ref([]);
let total = ref<number>(0);
let currentPage = ref(1);
const pageSize = 12;
const searchWord = ref('');
const isLoading = ref<Boolean>(false);

function search() {
  isLoading.value = true;
  if (isEmpty(searchWord.value)) {
    fetchData();
    return;
  }
  global
    .api(`/api/wish/search?keyword=${searchWord.value}`)
    .then(({ code, data, msg }) => {
      if (code !== 200) throw new Error(msg);
      console.log('data=', data);
      dataList.value = data.list;
      total.value = data.count;
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err);
    });
}

function jumpUrl(id) {
  let routeData = router.resolve({
    query: { id },
    path: '/detail',
  });
  window.open(routeData.href, '_blank');
  // router.push({ path: '/detail', query: { id } });
}

function fetchData(page = 1) {
  isLoading.value = true;
  global
    .api(`/api/wish/list?category=${props.label}&page=${page}&rows=${pageSize}`)
    .then(({ code, data, msg }) => {
      if (code !== 200) throw new Error(msg);
      console.log('data=', data);
      dataList.value = data.list;
      total.value = data.count;
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err);
    });
}
onMounted(() => {
  console.log('hello= this is mounted');
  fetchData();
});
function handleCurrentChange(val) {
  fetchData(val);
  console.log('VAL=', val);
}
</script>
<style lang="less">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cardContainer {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  justify-items: center;
  width: 100%;
  margin-bottom: 20px;
  @media only screen and (max-width: 640px) {
    grid-row-gap: 10px;
  }
}
.cardItem {
  // flex: 0 0 30%;
  // width: 300px;
  // margin-bottom: 10px;
  // margin-left: 20px;
  padding: 5px;
  background-color: lightgreen;
}
.search {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: 40px;
  margin-bottom: 12px;
  padding-right: 12px;
  font-size: 20px;
}
.el-input {
  .el-input-group__append {
    background-color: Skyblue;
  }
}
</style>
