const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack')

// helpers
function resolve(file) {
  return path.resolve(__dirname, file)
}

// name of lib
const libName = 'lib'

// config
const mode = process.env.NODE_ENV || 'development'

const isDev = mode === 'development'

const publicPath = isDev ? './' : '/'

const devtool = isDev ? 'inline-source-map' : 'none'

const plugins = [
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(mode),
  }),
]
if (isDev) {
  plugins.push(new HotModuleReplacementPlugin())
} else {
  plugins.push(new CleanWebpackPlugin(resolve('dist')))
}

console.log(`---------------------`)
console.log(`mode: ${mode}`)
console.log(`---------------------`)

module.exports = {
  mode,
  devtool,
  entry: './src/index.ts',
  output: {
    library: libName,
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    path: resolve('dist'),
    filename: `${libName}.js`,
    chunkFilename: '[name].js',
    publicPath,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{ test: /\.ts?$/, loader: 'ts-loader', exclude: /node_modules/ }],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  devServer: {
    hot: true,
    contentBase: resolve('public'),
    publicPath: '/',
    port: 9000,
    watchContentBase: true,
  },
  plugins,
}
