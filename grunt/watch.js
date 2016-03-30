module.exports = {
  options: {
    spawn: true,
    interrupt: true
  },

  js: {
    files: [
      'config.json',
      'js/**/*.js'
    ],
    tasks: [
      'buildJS'
    ]
  },

  css: {
    files: [
      'scss/**/*.scss'
    ],
    tasks: [
      'buildCSS'
    ]
  }
}
