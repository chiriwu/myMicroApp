<template>
  <div class="card" @click="redirectToLink">
    <div class="card-image">
      <img :src="imgUrl" width="64px" height="64px" style="object-fit: cover" alt="Card Cover" />
    </div>
    <div class="card-content">
      <div class="card-title">{{ title }}</div>
      <div class="card-subtitle">{{ description }}</div>
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
    title: {
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
  align-items: center;
  width: 300px;
  height: 84px;
  padding: 10px;
  background-color: rgba(0, 0, 180, 0.2);
  border: 1px solid #eee;
  border-radius: 10px;
  .card-image {
    object-fit: cover;
  }
  .card-title {
    font-weight: 600;
    // font-size: 20px;
  }
  .card-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    // height: 64px;
    margin-left: 12px;
    overflow: hidden;
    .card-subtitle {
      width: 100%;
      margin-top: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-align: left;
      text-overflow: ellipsis;
    }
  }
}
</style>
