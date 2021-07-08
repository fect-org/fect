module.exports = function(api) {
  if (api) api.cache.never()
  const { BABEL_ENV, NODE_ENV } = process.env

  const isTest = NODE_ENV === 'test'
  const isEsModule = BABEL_ENV !== 'commonjs' && !isTest
  const setPresets = (env) => {
    if (env !== 'production') {
      return ['@vue/cli-plugin-babel/preset']
    }
    return [
      [
        '@babel/preset-env',
        {
          modules: isEsModule ? false : 'commonjs',
        },
      ],
      '@babel/preset-typescript',
    ]
  }

  const setPlugins = (env) => {
    if (env !== 'production') {
      return ['@vue/babel-plugin-jsx']
    }

    return [
      [
        '@babel/plugin-transform-runtime',
        { corejs: false, helpers: true, useESModules: isEsModule },
      ],
      '@vue/babel-plugin-jsx',
    ]
  }

  return {
    presets: setPresets(NODE_ENV),
    plugins: setPlugins(NODE_ENV),
  }
}
