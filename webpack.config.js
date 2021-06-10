const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: "/",
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
        "@components": path.resolve(__dirname, 'src/components/'),
        "@styles": path.resolve(__dirname, 'src/styles/')
    }
  },
  mode: 'production', //Modo de produccion
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader' }
        ]
      },
      { //Regla para CSS con webpack
          test: /\.s[ac]ss$/, //Identifica si es un archivo de CSS o SASS
          use: [ //Elementos con los que vamos a trabajr
              'style-loader',
              'css-loader',
              'sass-loader'
          ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),

    new MiniCssExtractPlugin({
        filename: '[name].css'
    }),

    new CleanWebpackPlugin()
  ],

  optimization: {
    minimize: true,
    minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserWebpackPlugin()
    ]
  }

}

