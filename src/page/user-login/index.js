/*
* @Author: Marte
* @Date:   2018-04-16 15:28:45
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-21 14:20:28
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm =require('util/mm.js');
var _user = require('service/user-service.js');

var formError ={
    //表单错误提示
    show: function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function(){
        $('.error-item').hide().find('.err-msg').text('');
    },
};

var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this=this;
        $('#submit').click(function(){
            _this.submit();
        });
        $('.user-content').keyup(function(e){
            if(e.keyCode===13){
                _this.submit();
            }
        });
    },
    submit: function(){
        var formData ={
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        },
        validateResult = this.formValidate(formData);
        if(validateResult.status){
            //提交
            _user.login(formData,function(res){
                window.location.href=_mm.getUrlParam('redirect')||'./index.html';
            },function(errMsg){
                formError.show(errMsg);
            });
        }else{
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});