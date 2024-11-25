<template>
  <div id="container">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
onMounted(() => {
  console.log('this.route=', useRouter(), useRoute());
});
</script>

<style lang="less" scoped>
#container {
  padding: 12px;
  padding-bottom: 30px;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-image: linear-gradient(to right bottom, rgb(220, 252, 231), rgb(219, 234, 254));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 20px;
  a {
    color: #2c3e50;
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
