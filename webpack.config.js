const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')

module.exports = (_, argsv) => ({
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8081,
    hotOnly: true
  },
  output: {
    publicPath: argsv.mode === 'development' ? 'http://localhost:8081/' : 'https://consumer.vercel.app/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react']
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'consumer',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {},
      shared: require('./package.json').dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
})
