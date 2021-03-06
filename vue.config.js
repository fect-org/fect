const path = require('path')

module.exports = {
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
    performance: {
      hints: process.env.NODE_ENV === 'production' ? false : 'warning',
    },
  },
}
