module.exports = {
  default: [
    'build',
    'connect:development',
    'watch'
  ],

  build: [
    'buildCSS',
    'buildJS'
  ],

  buildJS: [
    'webpack'
  ],

  buildCSS: [
    'sass'
  ],

  server: [
    'connect:production'
  ]
}
