/*
* @Author: Marte
* @Date:   2018-04-26 13:54:07
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-27 00:04:11
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _order          = require('service/order-service.js');
var _address          = require('service/address-service.js');
var _product         = require('service/product-service.js');
var templateProduct   = require('./product-list.string');
var templateAddress   = require('./address-list.string');
var addressModal      =require('./address-modal.js');

var page ={
    data:{
        selectedAddressId:null,
    },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent:function(){
        var _this = this;
        //地址选择
        $(document).on('click','.address-item',function(){
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId =$(this).data('id');
        });
        //订单提交
        $(document).on('click','.order-submit',function(){
            var shippingId =_this.data.selectedAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId:shippingId
                },function(res){
                    window.location.href='./payment.html?orderNumber=' + res.orderNo;
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips('请选择地址后再提交');
            }
        });
        //添加地址
        $(document).on('click','.address-add',function(){
            addressModal.show({
                isUpdate:false,
                onSuccess :function(){
                    _this.loadAddressList();
                }
            });
        })
        //编辑地址
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            var shippingId =$(this).parents('.address-item').data('id');
            _address.getAddress(shippingId,function(res){
                addressModal.show({
                    isUpdate:true,
                    data:res,
                    onSuccess:function(){
                        _this.loadAddressList();
                    }
                });
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
        //删除地址
        $(document).on('click','.address-delete',function(e){
            e.stopPropagation();
            var id =$(this).parents('.address-item').data('id');
            if(window.confirm('确认删除该地址？')){
                _address.deleteAddress(id,function(res){
                    _this.loadAddressList();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }
        });
    },
    loadAddressList : function(){
        var _this =this;
        //获取地址列表
        $('.address-con').html('<div class="loading"></div>')
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            var addressListHtml = _mm.renderHtml(templateAddress,res);
                $('.address-con').html(addressListHtml);
        },function(errMsg){
            $('.address-con').html('<p class="err-tip">地址加载失败，请重试</p>');
        })
    },
    //地址列表选中状态
    addressFilter:function(data){
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag = false;
            for(var i =0,length=data.list.length;i<length;i++){
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive=true;
                    selectedAddressIdFlag =true;
                }
            };
            //如果选中地址不在列表，删除
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        }
    },
    //加载商品清单
    loadProductList : function(){
        $('.product-con').html('<div class="loading"></div>')
        var _this =this;
        //获取地址列表
        _order.getProductList(function(res){
            var productListHtml = _mm.renderHtml(templateProduct,res);
                $('.product-con').html(productListHtml);
        },function(errMsg){
            $('.product-con').html('<p class="err-tip">商品信息加载失败，请重试</p>');
        })
    },
}
$(function(){
    page.init();
})
