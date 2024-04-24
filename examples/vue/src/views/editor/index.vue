<template>
  <div class="editor">
    <!-- <editorBase :readOnly="false" style="width: 300px; overflow: hidden"></editorBase>
    <iframe src="https://www.baidu.com" frameborder="0" style="flex: 1"></iframe> -->
    <el-button type="primary" class="run-btn" @click="runMyProject">运行</el-button>
    <div class="func-area">
      <editorBase v-model="myCode" :readOnly="false" class="code-area"></editorBase>
      <div class="dom-area">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="moment"></el-checkbox>
          <el-checkbox label="dayjs"></el-checkbox>
          <el-checkbox label="qs"></el-checkbox>
          <el-checkbox label="lodash"></el-checkbox>
        </el-checkbox-group>
        <iframe id="myFrame" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import editorBase from './components/editorBase.vue';
export default {
  data() {
    return {
      HtmlCode: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=	, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
        </body>
        </html>`,
      myCode: `(function () {

})();`,
      // https://www.jsdelivr.com/package/npm/lodash
      npmList: {
        moment: 'https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js',
        dayjs: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js',
        qs: 'https://cdn.jsdelivr.net/npm/qs@6.11.2/dist/qs.min.js',
        lodash: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
      },
      checkList: [],
    };
  },
  components: { editorBase },
  mounted() {
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
        ele.src = this.npmList[item];
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
  },
};
</script>
<style lang="scss" scoped>
.run-btn {
  margin-top: 12px;
  font-size: 1.2rem;
}
.func-area {
  display: flex;
  flex-direction: row;
  padding: 10px;
  .code-area {
    flex: 1;
    overflow: hidden;
  }
  .dom-area {
    flex: 1;
    background-color: #eee;
  }
}

.editor {
  color: #7265e6;
}
</style>
