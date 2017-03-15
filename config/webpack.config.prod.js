// lib
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

// paths
const root = path.resolve(__dirname, '..')
const buildPath = path.resolve(root, 'dist')
const srcPath = path.resolve(root, 'src')
const publicPath = path.resolve(srcPath, 'public')
const htmlPath = `${publicPath}/index.html`
const indexPath = `${srcPath}/index.js`

// loaders
// ==============================================
const loaders = []

// handle js linting
loaders.push({
  enforce: 'pre',
  test: /\.(js|jsx)$/,
  loader: 'eslint-loader',
  exclude: /node_modules/,
  options: {
    emitError: true,
    failOnError: true
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
    hash: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  })
)

plugins.push(new UglifyJSPlugin())

// config
module.exports = () => {
  return {
    bail: true,
    entry: [ indexPath, htmlPath ],
    output: {
      path: buildPath,
      filename: '[name].js'
    },
    module: { loaders },
    plugins
  }
}
