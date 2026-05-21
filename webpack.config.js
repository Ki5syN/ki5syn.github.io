
const path = require('node:path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development', 

  entry: './src/index.js',   
  
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};