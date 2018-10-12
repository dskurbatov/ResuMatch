const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css/,
        //extract all css into one file
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  resolve: {
    //when require do not need specify type
    extensions: ['.js', '.jsx', '.json']
  },
  devServer: {
    contentBase: './dist',
    //enable hot module reloading
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    //save all extracted css files into styles.css
    new ExtractTextPlugin("styles.css")
  ]
}
