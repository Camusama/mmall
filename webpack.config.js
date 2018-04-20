/*
* @Author: Marte
* @Date:   2018-04-15 22:32:27
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-20 15:18:36
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
        'detail' : ['./src/page/detail/index.js'],
        'user-login' : ['./src/page/user-login/index.js'],
        'user-register' : ['./src/page/user-register/index.js'],
        'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
        'user-center'       : ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
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
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','重设密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8900/');
}

module.exports=config;