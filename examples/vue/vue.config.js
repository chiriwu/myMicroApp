const path = require('path');
const { name } = require('./package');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 7101; // dev port
const isProd = process.env.NODE_ENV === 'production';
const _publicPath = isProd ? '/v1/vue/' : '/';

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
  publicPath: _publicPath,
  // optimization: {
  //   minimize: true,
  //   minimize: [new TerserPlugin()],
  // },
  chainWebpack: (config) => {
    // 匹配相应的文件进行配置,解决element的静态文件在线上路径没有加上publicPath
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options['limit'] = 4096;
        options['publicPath'] = _publicPath; // **重点：添加路径
        return options;
      });
    config.module
      .rule('media')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options['limit'] = 10000;
        options['publicPath'] = _publicPath; // **重点：添加路径
        return options;
      });
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options['limit'] = 4096;
        options['publicPath'] = _publicPath; // **重点：添加路径
        return options;
      });
  },
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
    plugins: [
      new MonacoWebpackPlugin({
        languages: [], // ts.work.js过大，去除ts语言，
      }),
      new BundleAnalyzerPlugin(),
    ],
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
        // {
        //   test: /\.scss$/,
        //   use: [
        //     'style-loader',
        //     'css-loader',
        //     {
        //       loader: 'sass-loader',
        //       options: {
        //         indentedSyntax: true,
        //       },
        //     },
        //   ],
        // },
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
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      scss: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        additionalData: `@import "~@/global.scss";`,
      },
    },
  },
};
