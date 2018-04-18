/*
* @Author: Marte
* @Date:   2018-04-18 19:44:19
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-18 20:46:39
*/

'use strict';
require('./index.css');
var _mm =require('util/mm.js');
require('page/common/nav-simple/index.js');

$(function(){
    var type = _mm.getUrlParam('type')|| 'default',
    $element =$('.' + type + '-success');
    $element.show();
})