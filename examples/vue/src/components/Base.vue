<!-- <template>
  <div>
    <div ref="container" class="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'TestComponent',
  data() {
    return {
      title: 'hello',
      description: 'world',
      buttonText: 'myButton',
    };
  },
  props: {},
  mounted() {
    // 获取画布元素
    const canvas = this.$refs.container;
    // 创建场景
    const scene = new THREE.Scene();

    // 创建摄像机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 创建心形几何体
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, -1);
    heartShape.bezierCurveTo(0, -1.8, -1.5, -1.8, -1.5, -1);
    heartShape.bezierCurveTo(-1.5, -0.2, -0.6, 0.6, 0, 1.4);
    heartShape.bezierCurveTo(0.6, 0.6, 1.5, -0.2, 1.5, -1);
    heartShape.bezierCurveTo(1.5, -1.8, 0, -1.8, 0, -1);

    const heartGeometry = new THREE.ShapeGeometry(heartShape);
    const heartMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4d6a,
    });
    const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
    scene.add(heartMesh);

    // 创建动画循环
    const animate = () => {
      requestAnimationFrame(animate);

      // 使心形旋转
      heartMesh.rotation.x += 0.005;
      heartMesh.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style> -->

<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    //初始化
    init: function () {
      //  创建场景对象Scene
      this.scene = new THREE.Scene();

      //网格模型添加到场景中
      //创建正方体
      let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      let material = new THREE.MeshNormalMaterial({
        color: 'white',
      });
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);
      // 创建心形几何体
      // const heartShape = new THREE.Shape();
      // heartShape.moveTo(0, -1);
      // heartShape.bezierCurveTo(0, -1.8, -1.5, -1.8, -1.5, -1);
      // heartShape.bezierCurveTo(-1.5, -0.2, -0.6, 0.6, 0, 1.4);
      // heartShape.bezierCurveTo(0.6, 0.6, 1.5, -0.2, 1.5, -1);
      // heartShape.bezierCurveTo(1.5, -1.8, 0, -1.8, 0, -1);

      // const heartGeometry = new THREE.ShapeGeometry(heartShape);
      // const heartMaterial = new THREE.MeshBasicMaterial({
      //   color: 0xff4d6a,
      // });
      // this.mesh = new THREE.Mesh(heartGeometry, heartMaterial);
      // this.scene.add(this.mesh);
      /**
       * 相机设置
       */
      let container = document.getElementById('container');
      this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);
      this.camera.position.z = 1;

      /**
       * 创建渲染器对象
       */
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },

    // 动画
    animate: function () {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.001;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
