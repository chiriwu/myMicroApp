<template>
  <div id="app">
    <Nav></Nav>
    <router-view />
  </div>
</template>

<script>
import Nav from '@/views/Nav.vue';

export default {
  data() {
    return {
      menuItems: ['Home', 'About', 'Services', 'Contact'],
      activeItem: 0,
    };
  },
  components: { Nav },
  methods: {},
};
</script>
<style>
#app {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding-bottom: 20px;
}

#nav a {
  color: #2c3e50;
  font-weight: bold;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
