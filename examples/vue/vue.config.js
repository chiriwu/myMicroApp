const path = require('path');
const { name } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 7101; // dev port

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  devServer: {
    // host: '0.0.0.0',
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
      // rules: [
      //   {
      //     test: /\.js$/,
      //     loader: 'babel-loader',
      //     exclude: function (modulePath) {
      //       return (
      //         (/node-modules/.test(modulePath) && !/node_modules\/monaco-editor/.test(modulePath)) ||
      //         /core-js/.test(modulePath)
      //       );
      //     },
      //     options: {
      //       presets: ['@babel/preset-env'],
      //       plugins: ['@babel/plugin-proposal-optional-chaining'],
      //     },
      //   },
      // ],

      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'defaults' }]],
            },
          },
        },
      ],

      //
      // rules: [
      //   {
      // 为什么这里写这个会报错，但是我不安装下面的loader又用不了，又链接说是由于其他某个地方有定义
      //     test: /\.scss$/,
      //     use: [
      //       'style-loader',
      //       'css-loader',
      //       {
      //         loader: 'sass-loader',
      //         options: {
      //           indentedSyntax: true,
      //         },
      //       },
      //     ],
      //   },
      // ],
    },
  },
};
