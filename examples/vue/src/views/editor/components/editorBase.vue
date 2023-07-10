<template>
  <div style="height: 1000px; width: 100%">
    <div class="editor-container" ref="editorContainer"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
export default {
  name: 'Editor',
  data() {
    return {
      message: 'Hello World',
      textColor: 'black',
      monacoInstance: null,
    };
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: 'javascript',
    },
  },
  watch: {
    readOnly: {
      handler(newVal, oldVal) {
        this.monacoInstance && this.monacoInstance.updateOptions({ readOnly: newVal });
      },
    },
  },
  mounted() {
    this.initMonaco();
  },
  methods: {
    setValue(value) {
      this.monacoInstance && this.monacoInstance.setValue(value);
    },
    initMonaco() {
      const that = this;
      import('monaco-themes/themes/Tomorrow-Night-Bright.json').then((data) => {
        monaco.editor.defineTheme('Tomorrow-Night-Bright', data);
        const monacoInstance = (this.monacoInstance = monaco.editor.create(this.$refs.editorContainer, {
          value: this.value,
          language: this.language,
          readOnly: this.readOnly,
          minimap: {
            enabled: false,
          },
          renderLineHighlight: 'none',
          wordWrap: 'on',
          folding: false,
          lineNumbersMinChars: 0,
          padding: {
            top: 5,
          },
          theme: 'Tomorrow-Night-Bright',
        }));
        monacoInstance.onDidChangeModelContent((event) => {
          const newValue = monacoInstance.getValue();
          console.log('i am here');
          this.$emit('input', newValue);
        });
      });
    },
  },
};
</script>
<style>
.editor-container {
  height: 100%;
  text-align: left;
}
</style>
