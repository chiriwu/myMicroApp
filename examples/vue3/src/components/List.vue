<template>
  <div class="container">
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
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      v-model:current-page="currentPage"
    >
    </el-pagination>
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
const pageSize = 16;
function jumpUrl(id) {
  router.push({ path: '/detail', query: { id } });
}

function fetchData(page = 1) {
  global
    .api(`/api/wish/list?category=${props.label}&page=${page}&rows=10`)
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
</style>
