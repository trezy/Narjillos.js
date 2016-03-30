module.exports = {
  app: {
    devtool: 'source-map',

    entry: './js/index.js',

    output: {
      filename: 'app.js',
      sourceMapFilename: 'app.js.map'
    },

    module: {
      loaders: [
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          test: /\.js$/,
          query: {
            presets: ['es2015']
          }
        }
      ]
    },

    resolve: {
      alias: {}
    },

    stats: {
      colors: true,
      reasons: true
    }
  }
}
