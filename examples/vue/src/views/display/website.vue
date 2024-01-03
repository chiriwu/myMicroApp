<template>
  <div>
    <h1>{{ websites.label || '暂无数据' }}</h1>
    <div class="container">
      <div class="websiteCardContainer" v-for="(item, index) in websites.children" :key="index">
        <websiteCard
          :title="item.title"
          :src="item.link"
          :imgUrl="item.imgUrl"
          :description="item.description"
          style="margin-top: 12px"
        ></websiteCard>
      </div>
    </div>
  </div>
</template>

<script>
import { WEBSITEARRAY } from './Enum.js';
import websiteCard from './components/websiteCard';
export default {
  data() {
    return {
      WEBSITEARRAY,
      websites: {},
    };
  },
  watch: {
    $route(to, from) {
      const name = to.path.split('/').at(-1);
      this.updateData(name);
    },
  },
  created() {
    if (this.$route?.path) {
      const name = this.$route?.path.split('/').at(-1);
      this.updateData(name);
    }
  },
  methods: {
    updateData(name) {
      this.websites = WEBSITEARRAY[name] || {};
    },
  },
  components: {
    websiteCard,
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-left: -36px;
  padding: 12px;
}
.websiteCardContainer {
  margin-left: 36px;
}
</style>
