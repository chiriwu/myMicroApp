<template>
  <div id="app">
    <Nav v-if="!noNav"></Nav>
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
  computed: {
    noNav: function () {
      console.log('computed', this, this?.$store.state, this?.$store.state.noNav);
      return this?.$store.state.noNav;
    },
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
  background-color: #b2dfee;
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
