const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function webpackConfig(env, argv) {
  const isDev = argv && argv.mode !== 'production';

  return {
    entry: path.resolve(__dirname, 'src', 'main.jsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDev ? 'bundle.js' : 'bundle.[contenthash].js',
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
    ],
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    devServer: {
      static: { directory: path.resolve(__dirname, 'public') },
      historyApiFallback: true,
      open: true,
      compress: true,
      hot: true,
      port: 3000,
    },
  };
};
