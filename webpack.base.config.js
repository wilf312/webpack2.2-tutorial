const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


// distの中身を削除
const del = require('del')
del(path.resolve(__dirname, 'dist') + '/*')

module.exports = function() {
  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      // main: ['./main.js'],
      rectest: ['./rectest.js'],
      vendor: ['moment'],
    },
    output: {
      // the output bundle
      // filename: '[name].js?[chunkhash]', // 開発と本番で振り分け
      chunkFilename: '[name].chunk.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            'babel-loader',
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader?modules',
            'postcss-loader',
          ],
        },

        // {
        //   test: /\.css$/,
        //   loader: ExtractTextPlugin.extract({
        //     loader: 'css-loader?sourceMap'
        //   })
        // },
        // {
        //   test: /\.ejs$/,
        //   loader: 'ejs-loader',
        //   query: {
        //     variable: 'data',
        //     interpolate : '\\{\\{(.+?)\\}\\}',
        //     evaluate : '\\[\\[(.+?)\\]\\]'
        //   }
        // },
      ]
    },
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