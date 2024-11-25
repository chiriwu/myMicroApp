<template>
  <div class="container">
    <div class="search">
      <el-input style="margin-right: 8px" v-model="searchWord" placeholder="请输入内容"></el-input>
      <el-button color="rgb(24,24,27)" type="primary" :icon="Search" @click="search">搜索</el-button>
      <!-- <el-input placeholder="请输入内容" style="width: 400px" @keyup.enter="search" v-model="searchWord">
        <template #append>
          <el-button type="primary" @click="search"> 搜索 </el-button>
        </template>
      </el-input> -->
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
    <div class="pagination">
      <el-pagination
        v-if="dataList.length"
        medium
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :pager-count="4"
        @current-change="handleCurrentChange"
        v-model:current-page="currentPage"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Card from '@/components/Card.vue';
import { Search } from '@element-plus/icons-vue';
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
  //todo 后续需要支持分页查询
  global
    .api(`/api/wish/search?keyword=${searchWord.value}`)
    .then(({ code, data, msg }) => {
      if (code !== 200) throw new Error(msg);
      console.log('data=', data);
      dataList.value = data.list;
      total.value = 0; // 支持分页后变成total.value = data.count
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
<style lang="less" scoped>
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
  // background-color: lightgreen;
}
.search {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 24px;
  .el-input {
    max-width: 480px;
    height: 36px;
  }
  button {
    height: 36px;
  }
}
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}
</style>
