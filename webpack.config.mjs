import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';


export default {
  mode: process.env.NODE_ENV || 'development',

  entry: path.resolve(process.cwd(), 'frontend/src/index.js'),

  output: {
    path: path.resolve(process.cwd(), 'frontend/dist'),
    filename: 'bundle.[contenthash].js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /vue/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: { sourceMap: true }
              },
              {
                loader: 'less-loader',
                options: { sourceMap: true }
              }
            ]
          },
          {
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: { sourceMap: true }
              },
              {
                loader: 'less-loader',
                options: { sourceMap: true }
              }
            ]
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      // Optional: shorter imports
      '@': path.resolve(process.cwd(), 'frontend/src')
    }
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      templateContent: () => `<!doctype html>
		<html lang="en">
		  <head>
		    <meta charset="UTF-8"/>
		    <meta name="viewport" content="width=device-width,initial-scale=1"/>
		    <title>Sum App</title>
		  </head>
		  <body>
		    <div id="app"></div>
		  </body>
		</html>`
    })
  ],

  devServer: {
    static: { directory: path.resolve(process.cwd(), 'frontend/public') },
    port: 8080,
    historyApiFallback: true,
    hot: true,
    open: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    ]
  },

  devtool: 'eval-cheap-module-source-map' 
};
