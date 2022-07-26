const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
      popup: './src/popup/Popup.tsx',
      options: './src/options/options.tsx',
      main: './src/scripts/main.tsx',
      background: './src/scripts/background.ts',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
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
    new HtmlWebpackPlugin({
        template: './src/options/options.html',
        filename: 'options.html'
    }),
    new CopyPlugin({
        patterns: [
            {from: "public"}
        ]
    })],
};