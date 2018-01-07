var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {
  entry: DEV + "/index.js",
  output: {
    path: OUTPUT + "/app",
    filename: "bundle.js",
    publicPath: "/app/"
},
devServer: {
    inline: true,
    port: 8080
},
module: {
    loaders: [{
        test: /\.js?/,
        include: DEV,
        loader: "babel-loader",
        query: {
            presets: ['es2015', 'react']
        }
    }]
  }
};

module.exports = config;
