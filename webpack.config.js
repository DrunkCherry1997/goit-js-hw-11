// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

// Ваш імпорт в JavaScript файлі
import './src/css/styles.css';
import './src/css/searchimg.css'; // Закриваюча одинарна лапка була відсутня
