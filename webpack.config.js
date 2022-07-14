const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
      popup: './src/popup/popup.tsx'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
      rules: [{
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
      },
    {
        test: /\.jsx?$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'], 
            }
        }
    }],
  },
  plugins: [new HtmlWebpackPlugin({
      template: './src/popup/popup.html',
      filename: 'popup.html'
    }),
    new CopyPlugin({
        patterns: [
            {from: "public"},
            {from: "src/scripts", to: "scripts"}
        ]
    })],
};