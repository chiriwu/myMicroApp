<template>
  <div class="card" @click="redirectToLink">
    <div class="card-image">
      <img :src="imgUrl" width="200px" height="200px" style="object-fit: cover" alt="Card Cover" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ name }}</h3>
      <p class="card-subtitle">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websites: [
        {
          id: 1,
          name: 'Vue官方网站',
          url: 'https://vuejs.org/',
          description: 'Vue.js是一个用于构建用户界面的渐进式框架',
        },
        {
          id: 2,
          name: 'GitHub',
          url: 'https://github.com/',
          description: '全球最大的社交编程和代码托管平台',
        },
        // 可以根据需要添加更多的网站信息
      ],
    };
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
    imgUrl: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  methods: {
    redirectToLink() {
      window.open(this.src);
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: row;
  .card-image {
    object-fit: cover;
  }
  .card-content {
    display: flex;
    flex-direction: column;
  }
}
</style>
