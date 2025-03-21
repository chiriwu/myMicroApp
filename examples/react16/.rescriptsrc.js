const { name } = require('./package');
const isProd = process.env.NODE_ENV === 'production';
const _publicPath = isProd ? '/v1/react/' : '/';
const path = require('path');

module.exports = {
  webpack: (config) => {
    config.output.publicPath = _publicPath;
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';
    config.resolve.alias = {
      // 将模块路径 @ 指向 /src/ 目录
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  devServer: (_) => {
    const config = _;

    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;

    config.hot = false;
    config.watchContentBase = false;
    config.liveReload = false;

    return config;
  },
};
