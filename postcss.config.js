const conf = require('./package.json')


module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: conf.browsersList
    })
  ]
}
