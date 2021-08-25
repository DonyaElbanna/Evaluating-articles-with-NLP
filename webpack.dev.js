const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  //babel-polyfill to be able to use async
  entry: ['@babel/polyfill', './src/client/index.js'],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/view/index.html"
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'Client',
    clean: true
    //starting from webpack 5, instead of clean-webpack-plugin
    //This clears the dist after every successful build
  },
};