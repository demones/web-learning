# Chrome 相关

## Chrome 奇淫技巧

* chrome浏览器无法访问https网页，提示不是私密连接解决方法
  在chrome中访问 https 的网页上，直接键盘敲入这11个字符：thisisunsafe，即可正常访问
* 修改host后chrome浏览器不能及时生效的解决办法
  * 浏览器中打开：chrome://net-internals/#sockets
  * 点击 Flush socket pools
  * 关闭浏览器后再重新打开
  * 如果还没生效，可以在控制台停用缓存

附：chrome://chrome-urls/可以看到chrome所有的配置界面

## 相关资料

* [官方开发者文档](https://developer.chrome.com)
* [Chrome 开发者工具中文指南](http://www.jianshu.com/p/cf36d48652f4)
  该文章在极客学院的[链接](http://wiki.jikexueyuan.com/project/chrome-devtools/)
* [中文参考](https://github.com/daguye918/Chrome-DevTools)
* [中文参考](https://github.com/leeon/chrome_devtool_book)
