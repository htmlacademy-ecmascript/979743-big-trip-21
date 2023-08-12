const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

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
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loaer: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
