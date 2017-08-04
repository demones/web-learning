# 手机网页前端调试

## 手机网页前端调试面板 Eruda

* 官方网站：https://github.com/liriliri/eruda
* 例子： http://liriliri.github.io/eruda/
* 介绍页：http://www.oschina.net/p/eruda

用法
* 根据是否为开发环境，直接导入
  ```javascript
  import eruda from 'eruda';
  eruda.init();
  ```
* 在页面中引入
  ```javascript
  (function () {
    if (/eruda=true/.test(window.location.href) || localStorage.getItem('active-eruda') === 'true'){
      var src = 'node_modules/eruda/dist/eruda.min.js';
      var script = document.getElementsByTagName('script')[0];
      var js = document.createElement('script');
      js.async = true;
      js.src = src;
      js.onload = function () {
        eruda.init();
      };
      script.parentNode.insertBefore(js, script);
    }
  })();
  ```

## 微信出品（一个针对手机网页的前端 console 调试面板）

* 官方网站：https://github.com/WechatFE/vConsole

## 微信调试工具

* http://blog.qqbrowser.cc/
