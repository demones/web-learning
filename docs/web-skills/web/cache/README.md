# 前端缓存

## 按缓存位置分类

我们可以在 Chrome 的开发者工具中，Network -> Size 一列看到一个请求最终的处理方式

* Service Worker: (ServiceWorker) -- Served from ServiceWorker, resource size: 52.8kB
* Memory Cache
  * (memory cache) -- Served from memory cache, resource size: 13.7kB
  * (prefetch cache) -- Served from prefetch cache, resource size: 10.7kB
* Disk Cache（强缓存）: (disk cache) -- Served from disk cache, resource size: 13.7kB
* 网络请求：会显示具体大小（多少K，多少M等），包含200、304

它们的优先级是：(由上到下查找，找到即返回，找不到则继续)

* memory cache 是浏览器为了加快读取缓存速度而进行的自身的优化行为，不受开发者控制，也不受 HTTP 协议头的约束，算是一个黑盒。
* Service Worker 是由开发者编写的额外的脚本，且缓存位置独立，出现也较晚，使用还不算太广泛。
* 我们平时最为熟悉的其实是 disk cache，也叫 HTTP cache (因为不像 memory cache，它遵守 HTTP 协议头中的字段)。平时所说的强制缓存，协议缓存，以及 Cache-Control 等，也都归于此类。

## Service Worker

## Memory Cache

## 强制缓存

强制缓存也称强缓存，请求会从本地硬盘中读取，可以造成强制缓存的 Header 头有 Cache-control 和 Expires

### Expires

这是 HTTP/1.0 的字段，表示缓存到期时间，是一个绝对的时间 (当前时间+缓存时间)，如

```shell
Expires: Thu, 10 Nov 2017 08:45:11 GMT
```

在响应消息头中，设置这个字段之后，就可以告诉浏览器，在未过期之前不需要再次请求。

但是，这个字段设置时有两个缺点：

1. 由于是绝对时间，用户可能会将客户端本地的时间进行修改，而导致浏览器判断缓存失效，重新请求该资源。此外，即使不考虑自行修改，时差或者误差等因素也可能造成客户端与服务端的时间不一致，致使缓存失效。
1. 写法太复杂了。表示时间的字符串多个空格，少个字母，都会导致非法属性从而设置失效。

### Cache-Control

已知Expires的缺点之后，在HTTP/1.1中，增加了一个字段Cache-Control，该字段表示资源缓存的最大有效时间，在该时间内，客户端不需要向服务器发送请求。

这两者的区别就是前者是绝对时间，而后者是相对时间。如下：

```shell
Cache-Control: max-age=2592000
```

下面列举一些 Cache-Control 字段常用的值：(完整的列表可以查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control))

* max-age: 设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。与Expires相反，时间是相对于请求的时间。
* must-revalidate: 如果超过了 max-age 的时间，浏览器必须向服务器发送请求，验证资源是否还有效。
* no-cache: 在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)。
* no-store: 缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存。
* public: 表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存，即使是通常不可缓存的内容。（例如：1.该响应没有max-age指令或Expires消息头；2. 该响应对应的请求方法是 POST 。）
* private: 所有的内容只有客户端才可以缓存，代理服务器不能缓存。默认值。

这些值可以混合使用，例如 Cache-Control:public, max-age=2592000。在混合使用时，它们的优先级如下图：(图片来自 <https://web.dev/http-cache/>)

![Cache-Control 参数优先级](/assets/web-skills/cache.png)

### Expires Cache-Control Pragma

* Expires 是 HTTP/1.0 用来设置缓存到期时间
* 从 HTTP/1.1 开始，Expires 逐渐被 Cache-Control 取代
* Cache-Control 的优先级高于 Expires，为了兼容 HTTP/1.0 和 HTTP/1.1，实际项目中两个字段我们都会设置，但目前大部分浏览器和服务端都支持1.1了，如果不考虑兼容性，可以不设置Expires
* 在 HTTP/1.1 之前，如果想使用 no-cache，通常是使用 Pragma 字段，如 Pragma: no-cache(这也是 Pragma 字段唯一的取值)。但是这个字段只是浏览器约定俗成的实现，并没有确切规范，因此缺乏可靠性。它应该只作为一个兼容字段出现。

总结：对于现代浏览器，我们只使用Cache-Control即可，IE也支持 Cache-Control

## 协议缓存

协议缓存也称弱缓存、对比缓存

TODO 未完成，待写

## 参考文章

以下参考为未读文章，写的不一定很好，可根据实际删减

* <https://zhuanlan.zhihu.com/p/44789005>
* <https://web.dev/http-cache/>
* <https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control>
* <https://cloud.tencent.com/developer/article/1662259>
* <https://www.jiqizhixin.com/articles/2020-07-24-12>
* <https://juejin.cn/post/6844903682060845063>
* <https://segmentfault.com/a/1190000039083880>
* <https://www.jianshu.com/p/4d55fa41f7ee>
* <https://juejin.cn/post/6981673766178783262>
* <https://juejin.cn/post/6993358764481085453>
* <https://juejin.cn/post/6904517485349830670>
* <https://juejin.cn/post/6844904116339261447>
* <https://mp.weixin.qq.com/s/d2zeGhUptGUGJpB5xHQbOA>
* <https://juejin.cn/post/6947936223126093861>
* <https://juejin.cn/post/6844903737538920462>
