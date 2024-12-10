const path = require('path');
const { name } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isProd = process.env.NODE_ENV === 'production';
const _publicPath = isProd ? '/v1/vue3/' : '/';
const port = 7105;

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  publicPath: _publicPath,
  devServer: {
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api/wish': {
        // target: 'http://localhost:3000', //这个是被替换的目标地址
        target: 'https://www.wjx666.top:3000', //这个是被替换的目标地址
        secure: true, //接受对方是https的接口
        changeOrigin: true, // 是否需要跨域
      },
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
    module: {
      rules: [
        {
          // test: /\.m?js$/,
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                [
                  '@babel/preset-typescript',
                  {
                    isTSX: true,
                    allExtensions: true,
                    appendTsSuffixTo: [/\.vue$/],
                  },
                ],
              ],
            },
          },
        },
      ],
    },
  },
};
