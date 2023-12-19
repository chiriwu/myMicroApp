import './public-path';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import api from './utils/api.js';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

let router = null;
let instance = null;
let history = null;

function render(props = {}) {
  const { container } = props;
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue3' : '/v1/vue3/');
  router = createRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vue3' : '/v1/vue3/',
    history,
    routes,
  });
  console.log('routes=', router);
  instance = createApp(App);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    instance.component(key, component);
  }
  instance.use(router);
  instance.use(store);
  instance.use(ElementPlus);
  instance.provide('global', {
    api,
  });
  instance.mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('%c%s', 'color: green;', 'vue3.0 app bootstraped');
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function mount(props) {
  console.log('[vue3] window.__POWERED_BY_QIANKUN__=', window.__POWERED_BY_QIANKUN__);
  storeTest(props);
  render(props);
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount() {
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  router = null;
  history.destroy();
}
