const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'client', 'src');
const DIST_DIR = path.join(__dirname, 'client', 'public');

const config = {
  devtool: 'inline-sourcemap',
  resolve: {
    modulesDirectories: ['node_modules', 'components'],
    extensions: ['', '.js', '.jsx']
  },
  entry: [path.join(SRC_DIR, 'index.js'), path.join(SRC_DIR, 'peer.js')],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel'
      }
    ]
  }
};

module.exports = config;
