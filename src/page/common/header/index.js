/*
* @Author: Marte
* @Date:   2018-04-17 23:37:26
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-20 23:05:52
*/

'use strict';
require('./index.css');
var _mm     = require('util/mm.js');
// 导航
var header = {
    //通用该页面头部
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onload: function(){
        var keyword = _mm.getUrlParam('keyword');
        //keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function(){
        var _this=this;
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //回车搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode=== 13){
                _this.searchSubmit();
            }
        });
    },
    //搜索提交
    searchSubmit:function(){
        var keyword =$.trim($('#search-input').val());
        //提交有keyword 跳转
        if(keyword){
            window.location.href="./list.html?keyword="+keyword;
        }else{
        //为空 返回首页
            _mm.goHome();
        }
    },
};

header.init();