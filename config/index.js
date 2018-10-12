'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
var os=require('os'),
  iptable=[],
  ifaces=os.networkInterfaces();
for (var dev in ifaces) {
  ifaces[dev].forEach(function(details,alias){
    if (details.family=='IPv4') {
      iptable.push(details.address);
    }
  });
}
let ip = "127.0.0.1";
// if(iptable.length==1)
// {
//   ip=iptable[0]
// }
// else{
//   iptable.forEach((item,index)=>{
//     if(item.startsWith("172.")||item.startsWith("192.")||item.startsWith("168.")){
//       ip=iptable[index]
//     }
//   })
// }

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/facepayWX/',
    proxyTable: {
      '/bioauth': {
        target: 'http://172.18.68.117',
        // target: "http://172.21.32.153:12000",
        // target: 'https://facepay.95516.com',
        changeOrigin: true,
        pathRewrite: {
          '^/bioauth': '/bioauth'
        },
        onProxyReq: function (proxyReq, req, res) {
        },
        onProxyRes: function onProxyRes(proxyRes, req, res) {
        }
      }
    },
    accessId:"12345678901234567890",
    // Various Dev Server settings
    host: ip, // can be overwritten by process.env.HOST
    port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../facepayWX/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../facepayWX'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/facepayWX/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
