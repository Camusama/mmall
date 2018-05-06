# mmall-fe
这是一个电商网站的demo，实现了几乎所有电商网站该有的基本功能的前端部分<br>
考虑兼容ie8,使用的是webpack@1.13.2版本<br>
初始化 npm install<br>
打包 webpack生成dist文件夹<br>
windows启动webpackserver npm run dev_win<br>
mac启动webpackserver npm run dev<br>
路径为localhost:xx/dist/view/默认为index.html,但路径为空，浏览器输入路径为localhost:xx/dist/view/index.html即可使路径正确<br>
测试接口需要额外配置，service里的接口路径，有：/order/* ，/cart/* ，/shipping/* ，/product/* ，/user/* 劫持到 www.happymmall.com 的对应/xxx/路径请求后端接口

