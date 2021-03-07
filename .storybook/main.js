const path = require('path')

module.exports = {
  stories: [
    '../docs/**/*.stories.mdx',
    '../docs/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      include: path.resolve(__dirname, '../docs'),
    })
    // Return the altered config
    return config
  },
}
