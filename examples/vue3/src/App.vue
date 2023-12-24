<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/home">Home</router-link> |
      <router-link to="/detail">Detail</router-link>
      hello -->
    </div>
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

<style lang="less">
#app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
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
