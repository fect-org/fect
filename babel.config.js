module.exports = {
  env: {
    development: {
      presets: ['@vue/cli-plugin-babel/preset'],
      plugins: ['@vue/babel-plugin-jsx'],
    },
    production: {
      presets: ['@babel/preset-env'],
      plugins: ['@vue/babel-plugin-jsx'],
    },
    test: {
      presets: ['@vue/cli-plugin-babel/preset'],
      plugins: ['@vue/babel-plugin-jsx'],
    },
  },
}
