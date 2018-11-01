const {GenerateSW} = require('workbox-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

plugins: [
  new GenerateSW({
    runtimeCaching: [
      {
          urlPattern: new RegExp('^https://maps.googleapis.com/(.*)'),
          handler: 'cacheFirst'
      },
      {
        urlPattern: /.*/,
        handler: 'networkFirst'
      }
    ]
  })
]
