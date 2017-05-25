const path    = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry:   './src/client.jsx',
  output:  {
    path:       path.resolve(__dirname, 'public'),
    filename:   'bundle.js',
    publicPath: '/public/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
  ],
  module: {
    rules: [
      {
        test:    /.jsx?$/,
        loader:  'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
