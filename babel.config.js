const presets = () => {
  if (process.env.NODE_ENV === 'production') {
    return '@babel/preset-env'
  }
  return '@vue/cli-plugin-babel/preset'
}

module.exports = {
  presets: [presets()],
  plugins: ['@vue/babel-plugin-jsx'],
}
