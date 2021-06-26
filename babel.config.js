module.exports = {
  env: {
    development: {
      presets: ['@vue/cli-plugin-babel/preset'],
      plugins: ['@vue/babel-plugin-jsx'],
    },
    production: {
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      plugins: ['@babel/plugin-transform-runtime', '@vue/babel-plugin-jsx'],
    },
    test: {
      presets: ['@vue/cli-plugin-babel/preset'],
      plugins: ['@vue/babel-plugin-jsx'],
    },
  },
}
