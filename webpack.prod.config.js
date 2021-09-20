const path = require('path');

module.exports = {
  entry: './layout/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './layout/dist')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        },
        exclude: /node_modules/,

      }
    ]
  }
};