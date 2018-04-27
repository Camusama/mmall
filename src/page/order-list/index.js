/*
* @Author: Marte
* @Date:   2018-04-27 14:03:24
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-27 17:02:04
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _order           = require('service/order-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        listParam : {
            pageNum:1,
            pageSize:10
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadOrderList();
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });

    },
    loadOrderList:function(){
        var orderListHtml="",
        _this=this,
        $listCon=$('.order-list-con');
        _order.getOrderList(this.data.listParam,function(res){
            orderListHtml=_mm.renderHtml(templateIndex,res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        },function(errMsg){
            $listCon.html('<p class="err-tip">加载失败，请刷新后重试</p>');
        })
    },
    //分页信息
    loadPagination:function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    },

};
$(function(){
    page.init();
});