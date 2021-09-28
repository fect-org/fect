const { join } = require('path')
const { ESM_PATH, CJS_PATH } = require('../constant')

const CSS_BASE_LOADERS = [
  'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: require('../../postcss.config'),
    },
  },
]

const getUMDConfig = (mini = false) => {
  return {
    mode: 'production',
    stats: 'none',
    entry: {
      fect: join(ESM_PATH, 'index.js'),
    },
    output: {
      path: CJS_PATH,
      library: 'fect',
      libraryTarget: 'umd',
      filename: mini ? '[name].min.js' : '[name].js',
      umdNamedDefine: true,
      // eslint-disable-next-line quotes
      globalObject: "typeof self !== 'undefined' ? self : this",
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                compilerOptions: {
                  preserveWhitespace: false,
                },
              },
            },
          ],
        },
        {
          test: /\.(js|ts|jsx|tsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          sideEffects: true,
          use: CSS_BASE_LOADERS,
        },
        {
          test: /\.less$/,
          sideEffects: true,
          use: [...CSS_BASE_LOADERS, 'less-loader'],
        },
      ],
    },
    externals: {
      vue: {
        root: 'vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
      },
    },
    performance: false,
    optimization: {
      minimize: mini,
    },
  }
}

module.exports = { getUMDConfig }
