<template>
  <div class="about-content">
    <!-- 将跳转目标网盘地址，倒计时<span style="color: lightblue; font-size: 20px">{{ times }}</span> -->
    <div v-for="(item, index) in dataDetail" :key="index" :style="{ color: colorSet[index], 'margin-bottom': '24px' }">
      <div class="itemcard" v-for="(v, k) in item" :key="k">
        {{ v }}
        <a class="link" v-if="isPanLink(v)" :href="getCombinePanLink(item, k, v)" target="__blank">链接直达</a>
        <a class="link" v-if="isQuarkLink(v)" :href="v" target="__blank">链接直达</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, inject } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const dataDetail = ref({});
const global = inject('global');
// const props = defineProps(['links']);
const colorSet = ref(['Teal', 'goldenrod', 'corn', 'Steelblue', 'Midnightblue']);
const props = defineProps({
  link: {
    type: String,
    default: '',
    required: false,
  },
});
const timeId = ref(null);
const times = ref(3); // 3s跳转
function fetchData(id) {
  global
    .api(`/api/wish/info?id=${id}`)
    .then(({ code, data, msg }) => {
      if (code !== 200) throw new Error(msg);
      console.log('data=', data);
      if (data.link) {
        const temp = JSON.parse(data.link);
        dataDetail.value = temp.map((item) => {
          return JSON.parse(item.replace(/'/g, '"'));
        });
      } else {
        dataDetail.value = [['暂无数据']];
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function jumpLinks() {
  if (times.value === 0) {
    window.open(props.link || '/v1/vue3', '_self');
    return;
  }
  times.value = times.value - 1;
}
const isPanLink = (link) => {
  return link?.startsWith('https://pan.baidu.com/s/');
};
const getCombinePanLink = (item, k, v) => {
  const len = item.length;
  if (!v?.includes('pwd=') && k <= len - 1) {
    return v + '&pwd=' + item[k + 1].trim().slice(-4);
  }
  return v;
};
const isQuarkLink = (link) => {
  return link?.startsWith('https://pan.quark.cn/s/');
};

onMounted(() => {
  if (route.query.id) {
    fetchData(route.query.id);
  } else {
    timeId.value = setInterval(jumpLinks, 1000);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about-content {
  color: #7265e6;
  text-indent: 2em;
}
.itemcard {
  padding: 5px;
  word-break: break-all;
  background-color: #eee;
}
.link {
  margin-left: 8px;
}
</style>
