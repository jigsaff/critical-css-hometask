const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(scss)$/,
        use: [miniCss.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new miniCss({
      filename: 'style.css',
    }),
    new HtmlCriticalWebpackPlugin({
      base: './dist',
      src: 'index.html',
      target: 'index.html',
      extract: true,
      inline: true,
      dimensions: [
        {
          width: 320, height: 480,
        },
        {
          width: 768, height: 1024,
        },
        {
          width: 1920, height: 1080,
        },
      ],
    }),
  ],
};
