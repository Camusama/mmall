# mmall-fe
线上部署：http://39.108.180.157:8080/mmall-dist/view/
请求接口用nginx反向代理至test.happymmall.com<br>
大部分后台数据集中在手机品类，部分商品详情及品类缺失，因为本来就没有数据<br>
复杂的接口请求集中在购物车页面的增删改查及分页，以及支付页面的地址管理和增删改查<br>
测试请注册一个账号，注册页面也有充分的表单内容正则匹配过程<br>
commit时间线在v1.0分支里<br>


本项目的基本结构为：静态文件img/,页面view/,接口请求service/,脚手架工具util/,组件page/ <br>
组件以文件夹形式体现，类似于vue单文件组件，如src/page/common/header,里面有index.js,index.css,配合/src/view/layout/header.html分别对应vue单文件组件三个部分<br>
view/里的html文件为静态模板，组件的动态template以index.string文件形式存在。<br>
脚手架util/里slider,pagination,cities也是组件。mm.js集成了ajax请求，解析Hogan模板，统一登录和退出，表单验证，页面提示等功能，在所有组件index.js里被引入。


这是一个电商网站的demo，实现了几乎所有电商网站该有的基本功能的前端部分<br>
模块化解决方案为CommonJS,使用jquery进行dom操作<br>
页面template使用Hogan插件<br>
考虑兼容ie8,使用的是webpack@1.13.2版本<br>
初始化 npm install<br>
打包 webpack生成dist文件夹<br>
windows启动webpackdevserver npm run dev_win<br>

测试接口需要使用proxy软件配置，service里的接口路径，有：/order/* ，/cart/* ，/shipping/* ，/product/* ，/user/* 劫持到 www.happymmall.com 的对应/xxx/路径请求后端接口<br>


