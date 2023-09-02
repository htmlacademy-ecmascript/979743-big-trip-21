const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { request } = require('http');
const HtmlPlugin = require('html-webpack-plugin');
// const duration = require('dayjs/plugin/duration');

module.exports = {
  entry: './src/main.js', // Точка входа
  output: {
    filename: 'bundle.[contenthash].js', // Имя бандла
    path: path.resolve(__dirname, 'build'), // Директория для файлов сборки.
    //resolve прелбр-т относительный путь в абсол-й, __dirname хранит абс путь к директории проекта
    clean: true, // Удаляем предыдущую сборку перед созданием новой
  },
  devtool: 'source-map', // карта исходного кода, чтобы в инстр-х разраб-ка видеть не минифицированный код
  plugins: [
    new HtmlPlugin({
      template: 'public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
