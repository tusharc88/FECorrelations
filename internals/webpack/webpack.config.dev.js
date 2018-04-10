const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'eval',
  devServer: {
    contentBase: path.resolve(__dirname, '../../dist'),
    host: '127.0.0.1',
    port: 3000
    // compress: true,
    // proxy
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['dist'], {root: path.resolve(__dirname, '../../')}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../public/index.html')
    })
  ]
}
