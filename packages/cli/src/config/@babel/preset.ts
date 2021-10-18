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
          modules: isEsModule ? false : 'commonjs',
          loose: options.loose,
        },
      ],
      require.resolve('@babel/preset-typescript'),
    ],
    plugins: [['@vue/babel-plugin-jsx', { enableObjectSlots: options.enableObjectSlots }]],
  }
}
