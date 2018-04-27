/*
* @Author: Marte
* @Date:   2018-04-26 19:47:56
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-27 13:58:54
*/

'use strict';
var _mm             = require('util/mm.js');
var _address          = require('service/address-service.js');
var _cities         =require('util/cities/index.js');
var templateAddressModal  = require('./address-modal.string');

var addressModal={
    show : function(option){
        //绑定option 和标签
        this.option     = option;
        this.option.data=option.data||{};
        this.$modalWrap =$('.modal-wrap');
        //渲染页面
        this.loadModal();
        //绑定事件
        this.bindEvent();
    },
    bindEvent: function(){
        var _this =this;
        //省份城市联动
        this.$modalWrap.find('#receiver-province').change(function(){
            var selectedProvince =$(this).val();
            _this.loadCities(selectedProvince);
        })
        //提交收货地址
        this.$modalWrap.find('.address-btn').click(function(){
            var receiverInfo = _this.getReceiverInfo(),
            isUpdate = _this.option.isUpdate;
            //使用新地址且验证过
            if(!isUpdate && receiverInfo.status){
                _address.save(receiverInfo.data,function(res){
                    _mm.successTips('地址添加成功！');
                    _this.hide();
                    typeof _this.option.onSuccess ==='function' && _this.option.onSuccess(res);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            //更新收件人且验证通过
            else if(isUpdate && receiverInfo.status){
                _address.update(receiverInfo.data,function(res){
                    _mm.successTips('地址更新成功！');
                    _this.hide();
                    typeof _this.option.onSuccess ==='function' && _this.option.onSuccess(res);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了');
            }
        });
        //阻止事件冒泡
        this.$modalWrap.find('.modal-container').click(function(e){
            e.stopPropagation();
        });
        //x号和蒙版关闭
        this.$modalWrap.find('.close').click(function(){
            _this.hide();
        });
    },
    loadModal:function(){
        var addressModalHtml=_mm.renderHtml(templateAddressModal,{
            isUpdate:this.option.isUpdate,
            data    : this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        //加载省份
        this.loadProvince();
        //城市
        this.loadCities();
    },
    loadProvince:function(){
        var provinces = _cities.getProvinces() ||[],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        //更新地址时回填省份
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities: function(provinceName){
        var cities = _cities.getCities(provinceName)||[],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        //更新时回填城市
        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    //新地址表单验证
    getReceiverInfo:function(){
        var receiverInfo={},
            result={
                status:false
            };
        receiverInfo.receiverName=$.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince=this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity=this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverPhone=$.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress=$.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip=$.trim(this.$modalWrap.find('#receiver-zip').val());
        if (this.option.isUpdate) {
            receiverInfo.id =this.$modalWrap.find('#receiver-id').val();
        };
        if(!receiverInfo.receiverName){
            result.errMsg="请输入收件人姓名";
        }else if(!receiverInfo.receiverProvince){
            result.errMsg="请输入省份";
        }else if(!receiverInfo.receiverAddress){
            result.errMsg="请输入详细地址"
        }else if(!receiverInfo.receiverCity){
            result.errMsg="请输入城市";
        }else if(!receiverInfo.receiverPhone){
            result.errMsg="请输入手机号";
        }else{
            result.status=true;
            result.data=receiverInfo;
        }
        return result;
    },
    getSelectOption : function(optionArray){
        var html='<option value="">请选择</option>';
        for(var i=0,length=optionArray.length;i<length;i++){
            html +='<option value="'+optionArray[i]+'">'+optionArray[i] + "</option>"
        }
        return html;
    },
    //关闭弹窗
    hide: function(){
        this.$modalWrap.empty();
    },
}
module.exports=addressModal;