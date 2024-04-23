import './public-path';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';
import "./global.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject) return originalPush.call(this, location, resolve, reject);
  return originalPush.call(this, location).catch((e) => {});
};

let router = null;
let instance = null;
const noNavPages = ['login'];
function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vue' : '/',
    mode: 'history',
    routes,
  });
  router.beforeEach(async (to, from, next) => {
    if (store.state.token && to.name === 'login') {
      store.commit('setNav', noNavPages.includes(to.name));
      next({ name: 'home' });
    } else {
      store.commit('setNav', noNavPages.includes(to.name));
      next();
    }

    // 路由拦截
    // if (
    //   !store.state.token &&
    //   to.name !== 'login'
    // ) {
    //   next({ name: 'login' });
    // } else {
    //   store.commit('setNav', noNavPages.includes(to.name));
    //   next();
    // }
  });
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
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

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  console.log('[vue] window.__POWERED_BY_QIANKUN__=', window.__POWERED_BY_QIANKUN__);
  storeTest(props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}
