const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理输出',
    }),
  ],
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react', {
              'runtime': 'automatic'
            }]],
            plugins: [
              ['@babel/plugin-transform-react-jsx', {
                'runtime': 'automatic'
              }]
            ]
          }
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
};