const { join } = require('path')
const { ESM_PATH, CJS_PATH } = require('../constant')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CSS_BASE_LOADERS = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      esModule: true,
    },
  },
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
    plugins: [new MiniCssExtractPlugin({ filename: 'main.css' })],
  }
}

module.exports = { getUMDConfig }
