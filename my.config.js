const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const del = require('del')
del(path.resolve(__dirname, 'dist') + '/*')



module.exports = function() {
  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: './main.js',
      vendor: 'moment',
    },
    output: {
      // the output bundle
      filename: '[name].js?[chunkhash]',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [{
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?sourceMap'
        })
      }]
    },
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
      }),
      new ExtractTextPlugin({
        filename: 'bundle.css',
        disable: false,
        allChunks: true,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: [
          'vendor',
          'manifest',
        ]
      }),
    ]
  }
}