const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './client/src'),
  entry: {
    login: './login.js',
    polyfills: './polyfills.js',
    home: './home.js',
    track: './track.js',
    admin: './admin.js',
    profile: './profile.js',
  },
  output: {
    path: path.resolve(__dirname, './client/public/dist1/'),
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
