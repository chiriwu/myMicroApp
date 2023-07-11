<template>
  <div id="container">
    <DataGrid />
  </div>
</template>

<script>
import DataGrid from './components/DataGrid';

export default {
  name: 'previewExcel',
  components: {
    DataGrid,
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
