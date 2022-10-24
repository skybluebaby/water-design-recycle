const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './test/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.tsx', '.ts', '.jsx', '.js'],
        },
      },
      {
        test: /\.(j|t)sx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
};
