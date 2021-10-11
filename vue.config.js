module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

    // config.module
    //   .rule('vuetify')
    //   .test(/\.s(c|a)ss$/)
    //   // .include.add('src')
    //   // .add('test')
    //   .end()
    //   .use('vue-style-loader')
    //   // .loader('babel-loader')
    //   // .options({
    //   //   presets: [['@babel/preset-env', { modules: false }]],
    //   // });
  },
};
