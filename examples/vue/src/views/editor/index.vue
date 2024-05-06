<template>
  <div class="editor">
    <!-- <editorBase :readOnly="false" style="width: 300px; overflow: hidden"></editorBase>
    <iframe src="https://www.baidu.com" frameborder="0" style="flex: 1"></iframe> -->

    <div class="func-area">
      <div class="denpency-area">
        <h2 class="desc-title">依赖</h2>
        <span class="separate-line"></span>
        <el-checkbox-group class="denpendcy-item" v-model="checkList">
          <el-checkbox v-for="(item, key) in npmList" :key="key" :label="item">{{ key }}</el-checkbox>
        </el-checkbox-group>
        <el-button type="primary" class="add-btn" @click="showAddDenpendCyModal">添加依赖</el-button>
      </div>
      <div class="code-area">
        <h2 class="desc-title">JS区域</h2>
        <editorBase v-model="myCode" :readOnly="false"></editorBase>
      </div>
      <div class="dom-area">
        <!-- <el-button type="text">文字按钮</el-button> -->
        <!-- <h2 class="desc-title" @click="runMyProject">运行</h2> -->
        <el-button type="primary" class="run-btn" @click="runMyProject">运行</el-button>
        <iframe id="myFrame" frameborder="0"></iframe>
      </div>
    </div>
    <el-dialog title="添加依赖" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <addDenpendcy ref="dependcyRef"></addDenpendcy>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="verifyNpm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import editorBase from './components/editorBase.vue';
import addDenpendcy from './components/addDenpendcy.vue';
export default {
  data() {
    return {
      HtmlCode: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Document</title>
        </head>
        <body>
        </body>
        </html>`,
      myCode: `(function () {
  document.querySelector("body").innerHTML = "nihoa, bro"
})();`,
      // https://www.jsdelivr.com/package/npm/lodash
      npmList: {
        moment: 'https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js',
        dayjs: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js',
        qs: 'https://cdn.jsdelivr.net/npm/qs@6.11.2/dist/qs.min.js',
        lodash: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
      },
      checkList: [],
      dialogVisible: false,
    };
  },
  components: { editorBase, addDenpendcy },
  mounted() {
    this.getAllNpmKey();
    this.runMyProject();
  },
  methods: {
    runMyProject() {
      console.log(this.myCode, typeof this.myCode);
      const ifrmId = document.getElementById('myFrame');
      const doc = ifrmId.contentDocument ? ifrmId.contentDocument : ifrmId.contentWindow.document;
      let html = document.createElement('html');
      html.innerHTML = this.HtmlCode;
      this.checkList.forEach((item) => {
        let ele = document.createElement('script');
        ele.src = item;
        html.appendChild(ele);
      });
      let editorScript = document.createElement('script');
      editorScript.innerHTML = this.myCode;
      html.appendChild(editorScript);
      console.log('doc=', html.innerHTML);
      doc.open();
      doc.write(html.innerHTML);
      doc.close();
    },
    getAllNpmKey() {
      // 获取 localStorage 中所有键的数量
      const len = localStorage.length;
      // 创建一个数组，用于存储 localStorage 中的所有键
      const keys = {};
      const keyStart = 'localNpmLink';
      // 遍历 localStorage 中的所有键，并将它们存储到数组中
      for (let i = 0; i < len; i++) {
        if (localStorage.key(i).startsWith(keyStart)) {
          const key = localStorage.key(i).substring(keyStart.length);
          keys[key] = localStorage.getItem(localStorage.key(i));
        }
      }
      console.log('localkyes=', keys);
      this.npmList = Object.assign(this.npmList, keys);
      this.$forceUpdate();
      return keys;
      // 打印所有键
    },
    showAddDenpendCyModal() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async verifyNpm() {
      let res = await this.$refs.dependcyRef.verifyNpm();
      if (res) {
        this.dialogVisible = false;
        this.getAllNpmKey();
      } else {
        this.$message({
          message: '内容不可为空',
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$descHeight: 50px;
.run-btn {
  display: block;
  margin-top: 2px;
  font-size: 1.2rem;
}
.el-checkbox {
  margin: 0;
  margin-bottom: 5px;
  color: white;
  font-size: 16px;
}
.func-area {
  display: flex;
  flex-direction: row;
  padding: 10px;
  .desc-title {
    box-sizing: border-box;
    height: $descHeight;
    margin: 0;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .separate-line {
    position: absolute;
    right: 0;
    width: 3px;
    height: calc(100% - 50px);
    background-color: #eee;
  }
  .denpency-area {
    position: relative;
    width: 150px;
    background-color: #1d2528;
    .denpendcy-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-top: 10px;
      padding-left: 10px;
      color: white;
    }
    .add-btn {
      margin-top: 10px;
      font-size: 1.2rem;
    }
  }
  .code-area {
    flex: 1;
    overflow: hidden;
    background-color: black;
  }
  .dom-area {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 2px;
    background-color: #eee;
  }
}
.editor {
  color: #7265e6;
}
</style>
