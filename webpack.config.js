const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
      popup: './src/components/popup/Popup.tsx',
      options: './src/components/options/options.tsx',
      main: './src/scripts/content-scripts/main.ts',
      background: './src/scripts/service-workers/background.ts',
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
      template: './src/components/popup/popup.html',
      filename: 'popup.html'
    }),
    new HtmlWebpackPlugin({
        template: './src/components/options/options.html',
        filename: 'options.html'
    }),
    new CopyPlugin({
        patterns: [
            {from: "public"}
        ]
    })],
};