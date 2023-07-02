<template>
  <div class="navbar">
    <ul class="nav-menu">
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        @click="selectItem(item, index)"
        :class="{ active: activeItem === index }"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: 0,
    };
  },
  computed: {
    menuItems() {
      const routes = this.$router.options.routes;
      return routes.filter((item) => item.meta && item.meta.isNav).sort((a, b) => a.meta.number - b.meta.number);
    },
  },
  methods: {
    selectItem(item, index) {
      console.log('this.$router=', this.$router);
      this.activeItem = index;
      // 处理导航项点击事件
      this.$router.push({ name: item.name });
    },
  },
};
</script>

<style>
ul.nav-menu {
  display: flex;
  list-style-type: none;
}

ul.nav-menu li {
  margin-right: 10px;
  cursor: pointer;
}

ul.nav-menu li.active {
  font-weight: bold;
}
</style>
