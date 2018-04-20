/*
* @Author: Marte
* @Date:   2018-04-19 16:28:51
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-19 20:48:06
*/

'use strict';
require('./index.css');
var _mm =require('util/mm.js');
var _user = require('service/user-service.js');
require('page/common/nav-simple/index.js');
var formError ={
    //表单错误提示
    show: function(errMsg){
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hide: function(errMsg){
        $('.error-item').hide().find('.error-msg').text('');
    },
}

var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this=this;
        //验证username
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            //异步验证用户名存在
            if(!username){
                return;
            }
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            })
        });
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
            usename: $.trim($('#username').val()),
            password:$.trim($('#password').val()),
            passwordConfirm:$.trim($('#password-confirm').val()),
            phone:$.trim($('#phone').val()),
            email:$.trim($('#email').val()),
            question:$.trim($('#question').val()),
            answer:$.trim($('#answer').val()),
        },
        validateResult = this.formValidate(formData);
        if(validateResult.status){
            //提交
            _user.register(formData,function(res){
                window.location.href='./result.html?type=register';
            },function(errMsg){
                formError.show(errMsg);
            });
        }else{
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    formValidate: function(formData){
        var result={
            status:false,
            msg:'',
        };
        if(!_mm.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        if(formData.password.length <6){
            result.msg="密码长度不少于6位";
            return result;
        }
        if(formData.password !== formData.passwordConfirm){
            result.msg="两次输入密码不一致";
            return result;
        }
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        if(!_mm.validate(formData.email,'email')){
            result.msg = '邮箱不能为空';
            return result;
        }
        if(!_mm.validate(formData.question,'require')){
            result.msg = '问题不能为空';
            return result;
        }
        if(!_mm.validate(formData.answer,'require')){
            result.msg = '答案不能为空';
            return result;
        }
        //通过验证，返回正确提示
        result.status=true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
})