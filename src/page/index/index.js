/*
* @Author: Marte
* @Date:   2018-04-16 16:05:39
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-18 19:40:32
*/
'use strict'
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm =require('util/mm.js');
navSide.init({
    name : 'order-list'
});
//_mm.request({
//    url:'./test.do',
//    success: function(res){
//        console.log(res);
//    },
//    error:function(errMsg){
//        console.log(errMsg);
//    }
//});
//console.log(_mm.getUrlParam('test'));
//var html='<div>{{data}}</div>';
//var data={
//    data:123,
//};
//console.log(_mm.renderHtml(html,data));