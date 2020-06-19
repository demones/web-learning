# window.navigator.sendBeacon 无阻塞发送数据

## 基本用法

浏览器引入的sendBeacon方法，**发出的是异步请求，但是请求是作为浏览器任务执行的，与当前页面是脱钩的。**因此该方法不会阻塞页面卸载流程和延迟后面页面的加载。

```javascript
navigator.sendBeacon(url, data);
```


url 就是上报地址，data 可以是 ArrayBufferView，Blob，DOMString 或 Formdata，根据官方规范，需要 request header 为 CORS-safelisted-request-header，在这里则需要保证 Content-Type 为以下三种之一：

* application/x-www-form-urlencoded
* multipart/form-data
* text/plain

我们一般会用到 DOMString , Blob 和 Formdata 这三种对象作为数据发送到后端，下面以这三种方式为例进行说明。

```javascript
// 1. DOMString类型，该请求会自动设置请求头的 Content-Type 为 text/plain
const reportData = (url, data) => {
  navigator.sendBeacon(url, data);
};

// 2. 如果用 Blob 发送数据，这时需要我们手动设置 Blob 的 MIME type，
// 一般设置为 application/x-www-form-urlencoded。
const reportData = (url, data) => {
  const blob = new Blob([JSON.stringify(data), {
    type: 'application/x-www-form-urlencoded',
  }]);
  navigator.sendBeacon(url, blob);
};

// 3. 发送的是Formdata类型，
// 此时该请求会自动设置请求头的 Content-Type 为 multipart/form-data。
var data = {
   name: '前端名狮子'  ,
   age: 20
};
const reportData = (url, data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    let value = data[key];
    if (typeof value !== 'string') {
      // formData只能append string 或 Blob
      value = JSON.stringify(value);
    }
    formData.append(key, value);
  });
  navigator.sendBeacon(url, formData);
};
```

sendBeacon 如果成功进入浏览器的发送队列后，会返回true；如果受到队列总数、数据大小的限制后，会返回false。返回ture后，只是表示进入了发送队列，浏览器会尽力保证发送成功，但是否成功了，无法判断。

## 发送数据大小限制

目前没有给出具体的发送数据大小限制标准，不过有人做了下面的测试，当数据长度是65536时，异步请求进入浏览器发送队列失败，表明数据大小是有限制，不同的浏览器应该有所差别。

```javascript
var url = 'http://jsfiddle.net?sendbeacon';
var n = 65536; // sendBeacon limit for Chrome v40 on Windows (2^16)
var data = new Array(n+1).join('X'); // generate string of length n

if(!navigator.sendBeacon(url, data))
{
   alert('data limit reached');
}
```

## 业务场景

当用户关闭浏览器、刷新浏览器或者跳转其他页面时，向服务器发送一些统计数据。


1. 常规方案-直接发送 xhr 请求
  我们会优先想到监听页面的unload或者beforeunload事件，在事件回调里使用XMLHttpRequest发送异步请求。

  但是由于是xhr请求是异步发送，很可能在它即将发送的时候，页面已经卸载了，从而导致发送取消或者发送失败。异步请求响应返回后，由于页面和相关资源已经卸载，会引起function not found的错误。

  解决方法就是 AJAX 通信改成同步发送，即只有发送完成，页面才能卸载。

  ```javascript
  const syncReport = (url, { data = {}, headers = {} } = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, false);
    xhr.withCredentials = true;
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.send(JSON.stringify(data));
  };
  ```

  将xhr请求改为同步，虽然能够完成发送数据，但存在以下两个问题：

  部分浏览器已经不支持同步的 XMLHttpRequest 对象了（即open()方法的第三个参数为false）；
  xhr请求改为同步后，会阻塞页面的卸载和跳转，导致下一个页面导航加载的时机变晚，用户体验较差。

2. 动态图片

  通过在unload事件处理器中，创建一个图片元素并设置它的 src 属性的方法来延迟卸载以保证数据的发送。因为绝大多数浏览器会延迟卸载以保证图片的载入，所以数据可以在卸载事件中发送。

  ```javascript
  const reportData = (url, data) => {
    let img = document.createElement('img');
    const params = [];
    Object.keys(data).forEach((key) => {
      params.push(`${key}=${encodeURIComponent(data[key])}`);
    });
    img.onload = () => img = null;
    img.src = `${url}?${params.join('&')}`;
  };
  ```
  这种方法存在同样的问题，页面卸载流程被阻塞，后面页面的加载时机被延迟，用户体验不好

3. 通过使用 sendBeacon来发送，上面已提到


## 总结

这里是重点

* 兼容性问题的处理，降级使用 ajax 方案
* 在 IOS 微信中有 navigator.sendBeacon 存在且能拿到返回值为 true，但是请求并未发送出去，待验证
  https://developers.weixin.qq.com/community/develop/doc/0008e283360b0878715856f6353400
* 除了在关闭页面、隐藏页面使用 navigator.sendBeacon，是否正常的发送也优先使用这个方法，待验证
* 该方法是支持跨域的，包括：Access-Control-Allow-Credentials、Access-Control-Allow-Origin 和 Access-Control-Allow-Headers
* 注意 Content-Type要跟后端保持一致，否则无法发送
  ```javascript
  const blob = new Blob([JSON.stringify(data)], {
    type: 'application/x-www-form-urlencoded;charset=utf-8'
  });
  const result = window.navigator.sendBeacon(url, blob);
  ```
* 发送大小的验证
* 发出的请求，是放到的浏览器任务队列执行的，脱离了当前页面，所以不会阻塞当前页面的卸载和后面页面的加载过程，用户体验较好
* 移动端不支持事件 beforeunload，请使用 pagehide
  关于 visibilityState、pagehide 参看这里
  http://www.ruanyifeng.com/blog/2018/10/page_visibility_api.html
  http://www.ruanyifeng.com/blog/2018/11/page_lifecycle_api.html
  https://www.cnblogs.com/sunshq/p/10286283.html
  https://blog.csdn.net/zhangchb/article/details/78205110


## 参考文章

* https://blog.csdn.net/u012193330/article/details/102778979
* https://w3c.github.io/beacon/#sec-sendBeacon-method
* https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon
