module.exports = {
  default: [
    'build',
    'connect',
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
  ]
}
