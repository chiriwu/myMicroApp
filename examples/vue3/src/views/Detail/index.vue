<template>
  <div class="about-content">
    <h1>This is Detail page</h1>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const dataDetail = ref({});
const global = inject('global');

function fetchData(id) {
  global
    .api(`/api/wish/info?id=${id}`)
    .then(({ code, data, msg }) => {
      if (code !== 200) throw new Error(msg);
      console.log('data=', data);
      dataDetail.value = data.info;
    })
    .catch((err) => {
      console.log(err);
    });
}
onMounted(() => {
  // console.log('this.route=', route.query.id);
  fetchData(route.query.id);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about-content {
  color: #7265e6;
}
</style>
