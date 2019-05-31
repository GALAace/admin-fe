const path = require('path');
const webpack=require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let WEBPACK_ENV=process.env.WEBPACK_ENV ||'dev';

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:WEBPACK_ENV==='dev'
    ? '/dist/':'//s.galaace.com/admin-fe/dist/',
    filename: 'js/app.js'
  },
  resolve:{
    alias:{
      page:path.resolve(__dirname, 'src/page'),
      component:path.resolve(__dirname, 'src/component'),
      util:path.resolve(__dirname, 'src/util'),
      service:path.resolve(__dirname, 'src/service'),
    }
  },
  mode:'development',
  module: {
    rules: [
        // react文件的处理
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      },
    //   css文件的处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader" 
          })
      },
      //sass文件的处理
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
    //   图片的处理
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'resource/[name].[ext]'
            }
          }
        ]
      },
    //    字体图标的处理
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      favicon:'./favicon.ico'
    }),
    // 独立css文件
    new ExtractTextPlugin("css/[name].css"),
    //提出公共模块插件
    new webpack.optimize.SplitChunksPlugin({
        name:'common',
        filename:'js/base.js'

    })
    
  ],
  devServer: {
    historyApiFallback:{
      index:'/dist/index.html'
    },
    proxy:{
      '/manage':{
        target:'http://admin.galaace.com',
        changeOrigin:true
      },
      '/user/logout.do':{
        target:'http://admin.galaace.com',
        changeOrigin:true
      }

    }
  }
  
};