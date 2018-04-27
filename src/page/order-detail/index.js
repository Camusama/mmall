/*
* @Author: Marte
* @Date:   2018-04-27 17:05:17
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-27 19:22:14
*/

'use strict';
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _order           = require('service/order-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadDetail();
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });

    },
    bindEvent:function(){
        var _this =this;
        $(document).on('click','.order-cancel', function(){
            if(window.confirm('确实要取消该订单吗？')){
                _order.cancelOrder(_this.data.orderNumber,function(res){
                    _mm.successTips('该订单取消成功');
                    _this.loadDetail();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }
        })
    },
    loadDetail:function(){
        var orderDetailHtml="",
        _this=this,
        $content=$('.content');
        $content.html('<div class="loading"></div>')
        _order.getOrderDetail(this.data.orderNumber,function(res){
            _this.dataFilter(res);
            orderDetailHtml=_mm.renderHtml(templateIndex,res);
            $content.html(orderDetailHtml);
        },function(errMsg){
            $content.html('<p class="err-tip">'+ errMsg+'</p>');
        })
    },
    //数据适配
    dataFilter:function(data){
        data.needPay      = data.status == 10;
        data.isCancelable = data.status == 10;
    },
};
$(function(){
    page.init();
});