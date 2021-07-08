// const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { resolve } = require('path')

const SCRIPT_EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx', '.vue']
const STYLE_EXTENSIONS = ['.css', '.less']

const CSS_BASE_LOADERS = ['css-loader', 'postcss-loader']

const cjsPath = resolve(__dirname, '.././lib/')

const plugins = [new VueLoaderPlugin(), new MiniCssExtractPlugin()]

module.exports = {
  mode: 'production',
  resolve: {
    extensions: [...SCRIPT_EXTENSIONS, ...STYLE_EXTENSIONS],
  },
  entry: {
    fect: resolve(__dirname, '.././packages/index.ts'),
  },
  stats: 'none',
  output: {
    path: cjsPath,
    library: 'fect',
    libraryTarget: 'umd',
    filename: '[name].js',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-typescript'],
          plugins: ['@babel/plugin-transform-runtime', '@vue/babel-plugin-jsx'],
        },
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: CSS_BASE_LOADERS,
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [MiniCssExtractPlugin.loader, ...CSS_BASE_LOADERS, 'less-loader'],
      },
    ],
  },
  plugins,
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
    minimizer: [new CssMinimizerPlugin()],
  },
}
