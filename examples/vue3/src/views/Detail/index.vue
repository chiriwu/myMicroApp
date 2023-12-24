<template>
  <div class="about-content">
    <!-- 将跳转目标网盘地址，倒计时<span style="color: lightblue; font-size: 20px">{{ times }}</span> -->
    <div v-for="(item, index) in dataDetail" :key="index" :style="{ color: colorSet[index], 'margin-bottom': '24px' }">
      <div class="itemcard" v-for="(v, k) in item" :key="k">
        {{ v }}
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

      // dataDetail.value = JSON.parse(data.link.replace(/'/g, '"'));
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
onMounted(() => {
  // console.log('this.route=', route.query.id);
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
  background-color: #eee;
}
</style>
