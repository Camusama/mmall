/*
* @Author: Marte
* @Date:   2018-04-15 22:32:27
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-18 20:02:42
*/
var webpack =require("webpack");
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置 dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取htmlwebpackplugin参数方法
var getHtmlConfig= function(name,title){
    return{
        template:'./src/view/'+ name +'.html',
        filename:'view/'+ name +'.html',
        title:title,
        inject:true,
        hash : true,
        chunks:['common',name]
    };
};
var config ={
    entry:{
        'common': ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
        'result' : ['./src/page/result/index.js'],
    },
    output:{
        path:'./dist',
        publicPath:'/dist/',
        filename:'js/[name].js',
    },
    externals : {
        'jquery':"window.jQuery"
    },
    module:{
        loaders:[
            {test: /\.css$/, loader:Ex.extract('style-loader', 'css-loader','less-loader')},
            {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader:'url-loader?limit=100&name=resource/[name].[ext]'},
            {test: /\.string$/, loader:'html-loader'},
        ]
    },
    resolve: {
        alias : {
            util    :__dirname + '/src/util',
            page    :__dirname + '/src/page',
            service :__dirname + '/src/service',
            image   :__dirname + '/src/image',
            node_modules :__dirname + '/node_modules',
        }
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        }),
        //css 单独打包
        new Ex('css/[name].css'),
        //html模板
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8900/');
}

module.exports=config;