<template>
  <div class="container">
    <div class="leftElement">
      <img draggable :src="item" v-for="(item, index) in imgArr" :key="index" @mousedown="move" />
    </div>
    <div id="mountNode"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6';
export default {
  data() {
    return {
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
      this.graph.on('node:click', (ev) => {
        const node = ev.item; // 被点击的节点元素
        const shape = ev.target; // 被点击的图形，可根据该信息作出不同响应，以达到局部响应效果
        console.log('this.is', node._cfg.id);
        this.addRect();
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
    move(e) {
      let odiv = e.target; //获取目标元素
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      console.log('e=', disX, disY);
      document.onmousemove = (e) => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX - 200;
        let top = e.clientY - disY;

        //绑定元素位置到positionX和positionY上面
        // this.positionX = top;
        // this.positionY = left;
        this.addRect(left, top);
        //移动当前元素
        //   odiv.style.left = left + 'px';
        // odiv.style.top = top + 'px';
        console.log('left=,top=', left, top);
      };
      // 没有执行成功这个键盘起来
      document.onmouseup = (e) => {
        console.log('this is up=');
        document.onmousemove = null;
        document.onmouseup = null;
      };
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
</style>
