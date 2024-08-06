<template>
  <div class="card" @click="redirectToLink">
    <div class="card-image">
      <img
        :data-src="imgUrl"
        :src="defaultImg"
        width="64px"
        height="64px"
        class="lazy"
        style="object-fit: cover"
        alt="网站图标"
      />
    </div>
    <div class="card-content">
      <div class="card-title">{{ title }}</div>
      <div class="card-subtitle">{{ description }}</div>
    </div>
  </div>
</template>

<script>
import defaultImg from '@/assets/defaultImg.svg';

export default {
  data() {
    return {
      defaultImg,
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
  mounted() {
    this.$nextTick(() => {
      this.lazyLoad();
    });
  },
  methods: {
    redirectToLink() {
      window.open(this.src);
    },
    lazyLoad() {
      var lazyImages = document.querySelectorAll('img.lazy');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            debugger;
            let trueSrc = img.getAttribute('data-src');
            //把值赋值给图片的src属性
            // i.setAttribute("src", trueSrc);

            img.src = trueSrc;
            img.onload = function () {
              img.classList.remove('lazy');
            };
            observer.unobserve(img);
          }
        });
      });
      lazyImages.forEach(function (img) {
        observer.observe(img);
      });
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
  background-image: linear-gradient(180deg, #dae8fe, #fff 80%, #fff);
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
