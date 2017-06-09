const path = require('path');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  context: path.resolve(__dirname, "src"),
  entry: {
    index: './main.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    // sourceMapFilename: '[name].js.map'
  },
  resolve: {
    extensions: ['.js', '.ts', '.less']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            // options: {
            //   configFileName: path.resolve(__dirname, 'tsconfig.json')
            // }
          },
          'angular2-template-loader'
        ]
      }, {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      // }, {
      //   test: /\.css$/,
      //   use: 'raw-loader'
      }, {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      hash: true
    }),
    new ExtractTextWebpackPlugin({
      filename: '[name].css'
    })
  ]
}

module.exports = webpackConfig;