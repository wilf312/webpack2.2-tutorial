const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfig = require('./my.config')
// console.log('webpackConfig', webpackConfig)

const config = merge(webpackConfig(), {
  output: {
    // the output bundle
    filename: '[name].js',
  },
  devServer: {
    hot: true,
    inline: true,
    host: 'testtest.com',
    port: 12321
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})


const validate = require('webpack-validator').validateRoot

console.log(config)
const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/', // Same as `output.publicPath` in most cases.
  stats: {
    colors: true,
  },
}))

app.listen(config.devServer.port, function () {
  console.log(`Listening on port ${config.devServer.port}!`)
})
