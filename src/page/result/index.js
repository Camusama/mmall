/*
* @Author: Marte
* @Date:   2018-04-18 19:44:19
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-27 20:50:42
*/

'use strict';
require('./index.css');
var _mm =require('util/mm.js');
require('page/common/nav-simple/index.js');

$(function(){
    var type = _mm.getUrlParam('type')|| 'default',
    $element =$('.' + type + '-success');
    if(type ==='payment'){
        var $orderNumber = $element.find(".order-number"),
            orderNumber = _mm.getUrlParam('orderNumber');
        $orderNumber.find(".order-number").attr('href' +orderNumber);
    }
    $element.show();
})