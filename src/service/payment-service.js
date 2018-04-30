/*
* @Author: Marte
* @Date:   2018-04-27 20:30:45
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-27 20:40:33
*/

'use strict';
var _mm = require('util/mm.js');

var _payment= {
    //获取支付信息
    getPaymentInfo:function(orderNumber,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data    : {
                orderNo:orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    //返货订单状态
    getPaymentStatus:function(orderNumber,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo:orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _payment;