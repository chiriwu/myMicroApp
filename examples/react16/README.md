rescript 把 tsconfig.json 覆写，因此使用 extend 载入 path 的写法，保证能够使用@的 alias

react16 -> 18.2.0 rescript -> vite

// 使用原始脚手架创建获取 demo 示例 npm create vite@latest my-react --template react-ts

// 重新安装 react，react-dom 等

```javascript
yarn add react@18.2.0
yarn add react-dom@18.2.0
yarn add @vitejs/plugin-react@4.3.4
```

// 根目录需要创建 index.html，文件中填写入口文件 <script type="module" src="/src/index.tsx"></script>

// ReactDom 导入从 import ReactDOM from 'react-dom';修改成 import ReactDOM from 'react-dom/client';

// 因此调用写法也改变成

```javascript
function render(props) {
  const { container } = props;
  const rootElement = container ? container.querySelector('#root') : document.querySelector('#root');
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
```

// 安装 sass 使其支持 scss 语法 yarn add sass

// 配置 alias

```javascript
  resolve: {
    alias: {
      // @ 替代为 src
      '@': path.resolve(__dirname, 'src'),
    },
  },
```

// 配置 tsconfig.json

// loadable 不能使用了，loadableComponent uses the legacy contextType API which was removed in React 19 需要安装@loadable/component yarn add @loadable/component

React 不友好的点：

## 1. 升高版本后，很多 API 被弃用，需要重写

## 2. css 从 tsx 复制到 css/scss,必须重写，因为两边写法不一致

## 3. 一些库，比如 marked 必须使用 node18 版本，其他版本使用报错
