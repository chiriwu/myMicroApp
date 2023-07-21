<template>
  <div class="container">
    <div class="leftElement">
      <img
        width="50px"
        height="50px"
        draggable
        :src="item"
        v-for="(item, index) in imgArr"
        :key="index"
        @dragstart="dragStart"
        @dragend="dragEnd"
      />
    </div>
    <div id="mountNode"></div>
    <div class="rightElement">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称" v-for="key in showKey[curType]" :key="key">
          <el-input placeholder="请输入内容"></el-input> {{ key }}
        </el-form-item>
      </el-form>
      <el-button @click="test">anjian</el-button>
    </div>
  </div>
</template>

<script>
import G6 from '@antv/g6';
export default {
  data() {
    return {
      startdisX: 0,
      startdisY: 0,
      curItem: {},
      curType: '',
      form: {},
      formKey: {
        id: '',
        type: '',
        model: '',
        group: '',
        animate: '',
        visible: '',
        locked: '',
        event: '',
        keyShape: '',
        states: '',
        edges: '',
        styles: '',
        shapeFactory: '',
        bboxCache: '',
        anchorPointsCache: '',
        originStyle: '',
        currentShape: '',
      },
      showKey: {
        node: ['currentShape'],
        edge: ['styles', 'keyShape'],
      },
      imgArr: [require('@/assets/circle-solid.svg'), require('@/assets/square-solid.svg')],
      number: 1, // 图形自增id
      graph: null,
      graphData: {
        // 点集
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 200,
            label: 'rect23',
            type: 'rect',
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
    this.initG6();
    this.initEvent();
    // // 读取数据
    this.graph.data(this.graphData);
    // 渲染图
    this.graph.render();
  },
  methods: {
    initG6() {
      this.graph = new G6.Graph({
        container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        width: 800,
        height: 500,
        modes: {
          default: ['drag-canvas', 'drag-node'],
        },
      });
    },
    initEvent() {
      this.graph.on('click', (ev) => {
        const shape = ev.target;
        const item = ev.item;
        if (item) {
          const type = item.getType();
          console.log('type=', type);
        }
      });
      this.graph.on('canvas:click', (ev) => {
        const shape = ev.target;
        const item = ev.item;
        if (item) {
          const type = item.getType();
          console.log('type2=', type);
        }
      });
      // this.graph.on('node:click', (ev) => {
      //   const node = ev.item; // 被点击的节点元素
      //   const shape = ev.target; // 被点击的图形，可根据该信息作出不同响应，以达到局部响应效果
      //   console.log('this.is', node._cfg.id);
      //   this.addRect();
      // });
      // 点击节点
      this.graph.on('node:click', (e) => {
        console.log('hello this is node click');
        // 先将所有当前是 click 状态的节点置为非 click 状态
        const clickNodes = this.graph.findAllByState('node', 'click');
        clickNodes.forEach((cn) => {
          this.graph.setItemState(cn, 'click', false);
        });
        const nodeItem = e.item; // 获取被点击的节点元素对象
        console.log('nodeItem=', nodeItem);
        this.curItem = nodeItem;
        this.curType = 'node';
        this.graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
      });

      // 点击边
      this.graph.on('edge:click', (e) => {
        // 先将所有当前是 click 状态的边置为非 click 状态
        const clickEdges = this.graph.findAllByState('edge', 'click');
        clickEdges.forEach((ce) => {
          this.graph.setItemState(ce, 'click', false);
        });
        const edgeItem = e.item; // 获取被点击的边元素对象
        console.log('edgeItem=', edgeItem);
        this.curItem = edgeItem;
        this.curType = 'edge';
        this.graph.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
      });
    },
    addRect(x, y) {
      this.graph.addItem('node', {
        x,
        y,
        type: 'rect',
        label: 'reactxe',
        // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
        id: `rect-shape${this.number++}`,
      });
    },
    dragStart(e) {
      let odiv = e.target; //获取目标元素
      //算出鼠标相对元素的位置
      this.startDisx = e.clientX - odiv.offsetLeft;
      this.startDisy = e.clientY - odiv.offsetTop;
      console.log('disx,disy', this.startDisx, this.startDisy);
    },
    dragEnd(e) {
      let left = e.clientX - this.startDisx - 200;
      let top = e.clientY - this.startDisy;
      console.log('good clientD', left, top);
      this.addRect(left, top);
    },
    test() {
      const model = {
        id: 'node1',
        type: 'rect',
        label: 'node',
        style: {
          fill: 'red',
        },
      };

      this.curItem.update(model);
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
.leftElement {
  width: 200px;
  border: 1px solid grey;
}
#mountNode {
  flex: 1;
}
.rightElement {
  width: 200px;
  border: 1px solid grey;
}
</style>
