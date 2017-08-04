# Charles 抓包工具

## https 抓包的获取
默认设置是不支持 https 抓包的，所抓的包都是乱码。我们需要通过以下两步来设置（基于3.11版本）

1. 选择菜单 Proxy -> SSL Proxying Settings，然后勾选 Enable SSL Proxying
   还需要添加需要抓包的 https 请求，设置 Host 和 Part （端口默认为 443）
2. 安装证书，到菜单 Help -> SSL Proxying -> Install Charles Root Certificate ，选择默认方式添加即可。添加完设置信任该证书。
3. 如果是 Firefox 需要安装插件

执行完以上两步后，我们再来抓取 https 时，发现可以正确抓取。

官网参考地址
* http://www.charlesproxy.com/documentation/additional/legacy-ssl-proxying/
* http://www.charlesproxy.com/documentation/using-charles/ssl-certificates/
