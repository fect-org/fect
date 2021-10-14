export type PresetOptions = {
  loose?: boolean
  enableObjectSlots?: boolean
}

module.exports = (api: any, options: PresetOptions) => {
  if (api) api.cache.never()
  const { NODE_ENV, BABEL_ENV } = process.env
  const isTest = NODE_ENV === 'test'
  const isEsModule = !isTest && BABEL_ENV === 'esmodule'

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          module: isEsModule ? false : 'commonjs',
          loose: options.loose,
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { corejs: false, helpers: true, useESModules: isEsModule }],
      ['@vue/babel-plugin-jsx', { enableObjectSlots: options.enableObjectSlots }],
    ],
  }
}
