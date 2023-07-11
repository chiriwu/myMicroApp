<template>
  <div class="container">
    <div id="mountNode"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6';
export default {
  data() {
    return {
      graphData: {
        // 点集
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 200,
          },
          {
            id: 'node2',
            x: 300,
            y: 200,
          },
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: 'node1',
            target: 'node2',
          },
        ],
      },
    };
  },
  mounted() {
    const graph = new G6.Graph({
      container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
      // 画布宽高
      width: 800,
      height: 500,
    });
    // 读取数据
    graph.data(this.graphData);
    // 渲染图
    graph.render();
  },
  methods: {},
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
