module.exports = {
  development: {
    options: {
      port: process.env.PORT || 3000
    }
  },
  
  production: {
    options: {
      keepalive: true,
      port: process.env.PORT || 3000
    }
  }
}
