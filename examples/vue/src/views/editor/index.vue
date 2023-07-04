<template>
  <div class="editor">
    <h1>This is editor page</h1>
    <editorBase :readOnly="false"></editorBase>
  </div>
</template>

<script>
import editorBase from './components/editorBase.vue';
export default {
  data() {
    return {};
  },
  components: { editorBase },
};
</script>
<style scoped>
.editor {
  color: #7265e6;
}
</style>
