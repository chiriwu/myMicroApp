<template>
  <div class="editor">
    <!-- <editorBase :readOnly="false" style="width: 300px; overflow: hidden"></editorBase>
    <iframe src="https://www.baidu.com" frameborder="0" style="flex: 1"></iframe> -->
    <button style="font-size: 30px;" @click="runMyProject">运行</button style="font-size: 30px;">
    <div style="display: flex; flex-direction: row">
      <editorBase v-model="myCode" :readOnly="false" style="flex: 1; overflow: hidden"></editorBase>
      <iframe id="myFrame" frameborder="0" style="flex: 1"></iframe>
    </div>
  </div>
</template>

<script>
import editorBase from './components/editorBase.vue';
export default {
  data() {
    return {
      HtmlCode: ['<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta charset="utf-8">\n\t\t<meta name="viewport" content="width=device-width,initial-scale=1.0">\n\t\t<title>myproject</title>\n\t</head>\n\t<body>\n\t\t<div id="app"></div>\n\t</body>\n<script', '>',
        '<', '/script>', '</html>\n'],
      myCode: '(function () { })()'
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
      const finalStr =  this.HtmlCode.slice(0,2).join('').concat(this.myCode).concat(this.HtmlCode.slice(2).join(''))
      console.log('doc=', finalStr);
      doc.open();
      doc.write(finalStr);
      doc.close();
    },
  },
};
</script>
<style scoped>
.editor {
  color: #7265e6;
}
</style>
