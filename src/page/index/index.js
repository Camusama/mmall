/*
* @Author: Marte
* @Date:   2018-04-16 16:05:39
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-23 23:56:22
*/
'use strict'
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('./index.css');
require('util/slider/index.js');
var templateBanner = require('./index.string');
var navSide = require('page/common/nav-side/index.js');
var _mm =require('util/mm.js');
$(function(){
    //渲染轮播图
    var bannerhtml=_mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerhtml);
    var $slider =$('.banner').unslider({
        dots:true,
    });
    //左右按钮
    $('.banner-con .banner-arrow').click(function(){
        var forward=$(this).hasClass('prev')?'prev':'next';
        $slider.data('unslider')[forward]();
    })

})
// navSide.init({
//     name : ''
// });
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