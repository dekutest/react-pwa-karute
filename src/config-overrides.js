const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = function override(config) {
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
      new InjectManifest({
        swSrc: './src/service-worker.js',
        swDest: 'service-worker.js',
      })
    );
  }
  return config;
};
