const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/client/index.js'],
  devtool: 'inline-source-map',
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
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'Client',
    clean: true
  },
};