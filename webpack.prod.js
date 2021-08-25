const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");  //optimizes css
const TerserPlugin = require("terser-webpack-plugin");  //optimizes js

module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', './src/client/index.js'],
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/view/index.html"
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    //starting from webpack 5, instead of clean-webpack-plugin.
    //This clears the dist after every successful build.
    libraryTarget: 'var',
    library: 'Client'
  },
};