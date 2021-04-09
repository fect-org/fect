const context = require.context('./', true, /\.vue$/)

console.log(context.keys())
