# ajax 和 fetch

ajax 和 fetch 请求机制和返回码详解

以下说明基于chrome 92 浏览器

## 请求超时

* 请求超时，没有设置超时时间（采用浏览器默认超时策略，一般2分钟）
  * 不论是ajax还是fetch都会在控制台给出错误提示 ```net::ERR_CONNECTION_TIMED_OUT```
  * ajax：监听事件onreadystatechange，readyState === 4 时，此时 status 为 0，如果监听了onerror，会捕获错误信息，但错误信息中没有错误描述，此时 type 值为 error， loaded 值为 0，total 值为 0
  * fetch在catch中可以捕获错误信息，输出：TypeError: Failed to fetch
* 请求超时，设置超时时间
  * ajax 支持设置timeout超时，fetch不支持，但可以变相的设置，参见 https://juejin.cn/post/6844903845282185223
  * ajax 设置了timeout超时时间：监听事件onreadystatechange，readyState === 4 时，此时 status 为 0，如果监听了ontimeout，会捕获超时信息，但错误信息中没有错误描述，此时 type 值为 error， loaded 值为 0，total 值为 0

## 跨域请求

* 不论是ajax还是fetch都会在控制台给出错误提示 ```net::ERR_FAILED```
* ajax：监听事件onreadystatechange，readyState === 4 时，此时 status 为 0，如果监听onerror，会捕获错误信息，但错误信息中没有错误描述，此时 type 值为 error， loaded 值为 0，total 值为 0
* fetch在catch中可以捕获错误信息，输出：TypeError: Failed to fetch

## 无法访问的接口

* 不论是ajax还是fetch都会在控制台给出错误提示 ```net::ERR_NAME_NOT_RESOLVED```
* ajax：监听事件onreadystatechange，readyState === 4 时，此时 status 为 0，如果监听onerror，会捕获错误信息，但错误信息中没有错误描述，此时 type 值为 error， loaded 值为 0，total 值为 0
* fetch在catch中可以捕获错误信息，输出：TypeError: Failed to fetch

## 打开本地文件时，即URL前缀为 file

chrome 默认不允许加载本地资源，允许后，status 为 0

## 返回码 status 为 0 的情况

通过示例，只有ajax请求才会返回status为0的情况，fetch会直接reject，并返回错误信息

* 请求超时，没有设置超时时间，在监听事件onreadystatechange中，返回status 为 0
* 请求超时，设置超时时间，在监听事件onreadystatechange中，返回status 为 0
* 跨域请求，在监听事件onreadystatechange中，返回status 为 0
* 无法访问的接口，在监听事件onreadystatechange中，返回status 为 0
* 打开本地文件时，在监听事件onreadystatechange中，返回status 为 0

## status 说明

status的值一定会返回结果。

1、If the state is UNSENT or OPENED, return 0.（如果状态是UNSENT或者OPENED，返回0）
2、If the error flag is set, return 0.（如果错误标签被设置，返回0）
3、Return the HTTP status code.（返回HTTP状态码）

## onerror 和 ontimeout 说明

* 如果没有设置 timeout，超时和无法访问，都会先触发 onreadystatechange 再触发 onerror，此时 status 为 0
* 如果设置了 timeout，访问超时，会先触发 onreadystatechange 再触发 ontimeout，不会触发 onerror，此时 status 为 0
* 如果设置了 timeout，访问没超时，但无法访问，会先触发 onreadystatechange 再触发 onerror，此时 status 为 0
* 其他返回码status，不会触发onerror和ontimeout，如401，403等

## status常见返回码说明

* 200 (成功)正常返回
* 304 协议缓存
* 307 (临时重定向)，一般常见http强制跳转到https的情况
* 403 资源不可用，服务器理解客户的请求，但拒绝处理它，通常由于服务器上文件或目录的权限设置导致的WEB访问错误
* 404 资源不存在
* 405 Method Not Allowed，比如是POST请求，发送GET请求时就会返回 405 错误
* 500 服务端返回错误
* 504 网关超时

## 附：node端请求接口时，不同状态返回的错误结果

  TODO

## [示例](/examples/ajax-fetch.html)

## 参考

* https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
* https://fetch.spec.whatwg.org/
* [Fetch超时设置和终止请求](https://juejin.cn/post/6844903845282185223)
* [HTTP 响应代码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
