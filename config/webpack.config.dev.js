// lib
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// paths
const root = path.resolve(__dirname, '..')
const buildPath = path.resolve(root, 'dist')
const srcPath = path.resolve(root, 'src')
const publicPath = path.resolve(srcPath, 'public')
const htmlPath = `${publicPath}/index.html`
const indexPath = `${srcPath}/index.js`

// rules
// ==============================================
const loaders = []

// handle linting
loaders.push({
  enforce: 'pre',
  test: /\.(js|jsx)$/,
  loader: 'eslint-loader',
  exclude: /node_modules/,
  options: {
    emitWarning: true
  }
})

// handle js
loaders.push({
  test: /\.(js|jsx)$/,
  use: 'babel-loader'
})

// handle css
loaders.push({
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [require('autoprefixer')]
      }
    }
  ]
})

// handle html
loaders.push({
  test: /\.html$/,
  use: 'html-loader'
})

// handle images
loaders.push({
  test: /\.(jpe?g|png|gif|svg|ico)$/,
  use: 'file-loader'
})

// plugins
// =======================================
const plugins = []

// build html
plugins.push(
  new HtmlWebpackPlugin({
    template: htmlPath,
    hash: false
  })
)

// browsersync
plugins.push(
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    proxy: 'http://0.0.0.0:9090/'
  }, {
    reload: false
  })
)

// config
module.exports = () => {
  return {
    devtool: 'cheap-module-source-map',
    entry: [ indexPath ],
    output: {
      path: buildPath,
      filename: '[name].js'
    },
    module: { loaders },
    plugins,
    devServer: {
      contentBase: publicPath,
      port: 9090
    }
  }
}
