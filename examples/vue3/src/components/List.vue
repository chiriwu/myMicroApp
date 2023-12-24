<template>
  <div class="container">
    <div class="search">
      <el-input placeholder="请输入内容" style="width: 400px" @keyup.enter="search" v-model="searchWord">
        <template #append>
          <el-button type="primary" @click="search"> 搜索 </el-button>
        </template>
      </el-input>
    </div>
    <div class="cardContainer">
      <Card
        v-for="(item, index) in dataList"
        :key="index"
        class="cardItem"
        :config="item"
        @click="jumpUrl(item.id)"
      ></Card>
    </div>
    <el-pagination
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
<script setup>
import Card from '@/components/Card.vue';
import { defineProps, ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps(['label']);
const global = inject('global');
let dataList = ref([]);
let total = ref(0);
let currentPage = ref(1);
const pageSize = 12;
const searchWord = ref('');
function search() {
  global
    .api(`/api/wish/search?keyword=${searchWord.value}`)
    .then(({ code, data, msg }) => {
      if (code !== 200) throw new Error(msg);
      console.log('data=', data);
      dataList.value = data.list;
      total.value = data.count;
    })
    .catch((err) => {
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
  global
    .api(`/api/wish/list?category=${props.label}&page=${page}&rows=${pageSize}`)
    .then(({ code, data, msg }) => {
      if (code !== 200) throw new Error(msg);
      console.log('data=', data);
      dataList.value = data.list;
      total.value = data.count;
    })
    .catch((err) => {
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
  margin-left: -20px;
}
.cardItem {
  // flex: 0 0 30%;
  // width: 300px;
  margin-bottom: 10px;
  margin-left: 20px;
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
