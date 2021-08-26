const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let htmlPageNames = ['index', 'about'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/client/view/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    // chunks: [`${name}`] // respective JS files
  })
});

module.exports = {
  mode: "development",
  //babel-polyfill to be able to use async
  entry: ["@babel/polyfill", "./src/client/index.js"],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/view/index.html",
      // chunks: ['main']
    })
  ].concat(multipleHtmlPlugins),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "var",
    library: "Client",
    clean: true,
    //starting from webpack 5, instead of clean-webpack-plugin
    //This clears the dist after every successful build
  },
};
