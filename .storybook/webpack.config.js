const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('babel-preset-react-app')],
    },
  })

  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.plugins = [
    // hardcoded tsconfig.json's to load custom path aliases
    new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../packages/client/tsconfig.json'),
    }),
  ]

  return config
}
