const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    login: './login.js',
    polyfills: './polyfills.js',
    home: './home.js',
    index: './index.js',
    // track: './track.js',
  },
  output: {
    path: path.resolve(__dirname, './public/dist1/'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
};
