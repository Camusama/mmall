# mmall-fe
线上部署：http://39.108.180.157:8080/mmall-dist/view/
请求接口用nginx反向代理至test.happymmall.com<br>
大部分后台数据集中在手机品类，部分商品详情及品类缺失，因为本来就没有数据<br>
复杂的接口请求集中在购物车页面的增删改查及分页，以及支付页面的地址管理和增删改查<br>
测试请注册一个账号，注册页面也有充分的表单内容正则匹配过程<br>

这是一个电商网站的demo，实现了几乎所有电商网站该有的基本功能的前端部分<br>
模块化解决方案为CommonJS<br>
页面template使用Hogan插件<br>
考虑兼容ie8,使用的是webpack@1.13.2版本<br>
初始化 npm install<br>
打包 webpack生成dist文件夹<br>
windows启动webpackserver npm run dev_win<br>
mac启动webpackserver npm run dev<br>
路径为localhost:xx/dist/view/默认为index.html,但路径为空，浏览器输入路径为localhost:xx/dist/view/index.html即可使路径正确<br>
测试接口需要使用proxy软件配置配置，service里的接口路径，有：/order/* ，/cart/* ，/shipping/* ，/product/* ，/user/* 劫持到 www.happymmall.com 的对应/xxx/路径请求后端接口<br>


