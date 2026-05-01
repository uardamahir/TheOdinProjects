// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Uygulama giriş noktası
  output: {
    filename: 'main.js', // Çıktı dosyası adı
    path: path.resolve(__dirname, 'dist'), // Çıktı klasörü
    clean: true, // Her derlemede dist klasörünü temizle
  },
  devServer: {
  static: './dist',
  port: 8082, // veya 3000, 8888 gibi başka bir port seç
  open: true,
},
  module: {
    rules: [
      {
        test: /\.css$/i, // .css dosyaları için
        use: ['style-loader', 'css-loader'], // CSS'i import edebilmek için
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Artık HTML dosyamız src klasöründe
    }),
  ],
  mode: 'development', // Geliştirme modu
};
