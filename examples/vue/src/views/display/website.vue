<template>
  <div>
    <h1>网站信息</h1>
    <div v-for="website in WEBSITEARRAY" :key="website.id">
      <h2>{{ website.label }}</h2>
      <el-row>
        <el-col :span="8" v-for="(item, index) in website.children" :key="index">
          <websiteCard
            :name="item.label"
            :src="item.url"
            :imgUrl="item.imgUrl"
            :description="item.description"
          ></websiteCard>
        </el-col>
      </el-row>
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
    };
  },
  created() {
    const name = this.$routes;
    console.log('route1=', this.$route);
  },
  components: {
    websiteCard,
  },
};
</script>
