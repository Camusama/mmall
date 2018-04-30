/*
* @Author: Marte
* @Date:   2018-04-18 17:05:21
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-23 18:31:18
*/

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
//侧边导航
var navSide = {
    option:{
        name:'',
        navList:[
            {name:'user-center',desc:'个人中心',href:'./user-center.html'},
            {name:'order-list',desc:'我的订单',href:'./order-list.html'},
            {name:'user-pass-update',desc:'修改密码',href:'./user-pass-update.html'},
            {name:'about',desc:'关于mmall',href:'./about.html'}
        ]
    },
    init: function(option){
        //合并选项
        $.extend(this.option,option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav:function(){
        //计算active,传的名字添加active
        for(var i=0,iLength=this.option.navList.length;i<iLength;i++){
            if(this.option.navList[i].name===this.option.name){
                this.option.navList[i].isActive=true;
            }
        };
        //渲染list数据，把本option对象里的数据传进index.string中
        var navHtml=_mm.renderHtml(templateIndex,{
            navList: this.option.navList
        });
        //把html放入容器
        $(".nav-side").html(navHtml);
    }
};

module.exports=navSide;