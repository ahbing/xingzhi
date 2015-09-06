module.exports = {
  entry: "./public/javascripts/main.js",
  output: {
    path: "./public/build",
    publicPath: "/build/",
    filename: "build.js"
  },
  module: {
    loaders: [
      { test:/\.vue$/,loader: "vue-loader"},
      { test:/\.css$/,loader: "style-loader!css-loader?importLoaders=1"},
      { test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, loader: 'file-loader?limit=100000' }
    ]
  },
  devtool: '#source-map'
}