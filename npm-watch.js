const path = require('path')
const express = require('express')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfig = require('./my.config')
// console.log('webpackConfig', webpackConfig)




var config = merge(webpackConfig(), {
  output: {
    // the output bundle
    filename: '[name].js',

    path: path.resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    // match the output `publicPath`
    port: 12321,
    publicPath: '/',
    // match the output path
    contentBase: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
})


// add hot-reload related code to entry chunks
Object.keys(config.entry).forEach(function (name) {
  config.entry[name] = ['./dev-client'].concat(config.entry[name])
  config.entry[name] = ['react-hot-loader/patch'].concat(config.entry[name])
})

// config.entry = {
//       rectest: [
//         'react-hot-loader/patch',
//         // activate HMR for React

//         `webpack-dev-server/client?http://localhost:${config.devServer.port}`,
//         // bundle the client for webpack-dev-server
//         // and connect to the provided endpoint

//         'webpack/hot/only-dev-server',
//         // bundle the client for hot reloading
//         // only- means to only hot reload for successful updates
//         './rectest.js',
//       ],
//       vendor: ['moment'],
//     }



const validate = require('webpack-validator').validateRoot


// ----------------- サーバ立ち上げ

const app = express()
const compiler = webpack(config)

console.log(config.entry)

// 開発用の設定
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/', // Same as `output.publicPath` in most cases.
  stats: {
    colors: true,
    chunks: false,
  },
})


var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})





app.use(devMiddleware)
app.use(hotMiddleware)


app.listen(config.devServer.port, function () {
  console.log(`Listening on port ${config.devServer.port}!`)
})
