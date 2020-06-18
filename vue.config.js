const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const mock = require('./mock/index.js');

const devServerAssgin = process.env.VUE_APP_BASE_API === '/mock' ? { before: mock } : {};

// 将scss资源自动注册到其他模块;
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/var.scss'),
        path.resolve(__dirname, './src/styles/mixins.scss'),
        path.resolve(__dirname, './src/styles/fuctions.scss'),
      ],
    });
}

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      process.argv[3] === '--analyzer' ? new BundleAnalyzerPlugin({ analyzerMode: 'static' }) : () => {},
    ],
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)));
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5555',
        changeOrigin: true,
      },
    },
    ...devServerAssgin,
  },
};
