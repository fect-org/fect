const { join } = require('path')

module.exports = {
  entry: join(__dirname, 'packages'),
  formats: 'noumd',
}
