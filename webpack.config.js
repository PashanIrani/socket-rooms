const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    Server: './src/server/index.ts',
    Client: './src/client/index.ts'
  },
  resolve: { modules: [path.resolve(__dirname, 'node_modules')], alias: {src: path.resolve(__dirname, 'src')}, extensions: ['.ts', '.js'] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'SocketRooms[name]',
    libraryTarget: "commonjs2",
    libraryExport: 'default',
  },
}