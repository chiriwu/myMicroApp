<template>
  <div class="container">
    <div class="list" v-for="(item, index) in list" :key="index">
      <div style="display: flex; flex-direction: row">
        <el-input class="input-box" v-model.trim="item[0]" placeholder="请输入库名"></el-input>
        <el-input class="input-box" v-model.trim="item[1]" placeholder="请输入CDN链接"></el-input>
        <el-button class="opearte-btn" type="text" icon="el-icon-circle-plus" @click="addOne"></el-button>
        <el-button
          class="opearte-btn"
          type="text"
          icon="el-icon-remove"
          v-if="list.length > 1"
          @click="deleteOne(index)"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addDenpency',
  data() {
    return {
      list: [['', '']],
    };
  },
  methods: {
    addOne() {
      this.list.push(['', '']);
    },
    deleteOne(index) {
      this.list.splice(index, 1);
    },
    verifyNpm() {
      for (let i; i < this.list.length; i++) {
        if (!this.list[i][0] || !this.list[i][1]) {
          return false;
        }
      }
      this.list.forEach((item) => {
        localStorage.setItem('localNpmLink' + item[0], item[1]);
      });
      return true;
    },
  },
};
</script>
<style lang="scss" scoped>
.opearte-btn {
  font-size: 24px;
}
.input-box {
  margin-right: 10px;
}
</style>
