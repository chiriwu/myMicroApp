<template>
  <div class="about-content">
    将跳转目标网盘地址，倒计时<span style="color: lightblue; font-size: 20px">{{ times }}</span>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue';
// import { useRoute } from 'vue-router';
// const route = useRoute();
// const dataDetail = ref({});
// const global = inject('global');
// const props = defineProps(['links']);
const props = defineProps({
  link: {
    type: String,
    default: '',
    required: false,
  },
});
const timeId = ref(null);
const times = ref(3);
// function fetchData(id) {
//   global
//     .api(`/api/wish/info?id=${id}`)
//     .then(({ code, data, msg }) => {
//       if (code !== 200) throw new Error(msg);
//       console.log('data=', data);
//       dataDetail.value = data.info;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
function jumpLinks() {
  if (times.value === 0) {
    window.open(props.link || '/v1/vue3', '_self');
    return;
  }
  times.value = times.value - 1;
}
onMounted(() => {
  timeId.value = setInterval(jumpLinks, 1000);
  // console.log('this.route=', route.query.id);
  // fetchData(route.query.id);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about-content {
  color: #7265e6;
}
</style>
