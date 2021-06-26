# nginx 学习笔记

## brew 安装
brew install nginx

brew 安装的 nginx 配置文件路径 /usr/local/etc/nginx/nginx.conf

命令目录：/usr/local/bin/nginx

安装完提示信息

Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To have launchd start nginx now and restart at login:
  brew services start nginx
Or, if you don't want/need a background service you can just run:
  nginx


## 官方安装
mac 和 nginx 安装都可以从官方下载，到[这里](http://nginx.org/en/download.html)下载最新版本
下载解压后，运行以下命令

```bash
./configure
// mac 下
sh ./configure
```

安装后，命令、配置信息

```
nginx path prefix: "/usr/local/nginx"
nginx binary file: "/usr/local/nginx/sbin/nginx"
nginx modules path: "/usr/local/nginx/modules"
nginx configuration prefix: "/usr/local/nginx/conf"
nginx configuration file: "/usr/local/nginx/conf/nginx.conf"
nginx pid file: "/usr/local/nginx/logs/nginx.pid"
nginx error log file: "/usr/local/nginx/logs/error.log"
nginx http access log file: "/usr/local/nginx/logs/access.log"
nginx http client request body temporary files: "client_body_temp"
nginx http proxy temporary files: "proxy_temp"
nginx http fastcgi temporary files: "fastcgi_temp"
nginx http uwsgi temporary files: "uwsgi_temp"
nginx http scgi temporary files: "scgi_temp"
```  

## 启动、停止
brew 安装，命令目录 /usr/local/bin/nginx
* 启动命令 nginx
* 重启命令 nginx -s reload
* 停止命令 nginx -s stop

## 常用命令及配置信息
nginx services start // 启动NGINX
nginx -t // 检测nginx是否可以正常启动
nginx -s reload // 重启nginx 一般是在操作nginx.conf之后 执行这个操作
nginx -s stop // 停止nginx进程
ps aux | grep "nginx: worker process" 查看当前nginx的work user是谁。

nginx.conf => /usr/local/etc/nginx/nginx.conf
nginx 文件夹 => /usr/local/bin/nginx
error.log 报错日志 => /usr/local/var/log/nginx/error.log
nginx root根路径 => /usr/local/var/www/

## 问题

* 当提示 nginx [emerg] no "events" section in configuration ，则需要设置
  ```
    events {
     worker_connections  1024;
    }
  ```


## location 匹配

修饰符

* = 表示精确匹配。只有请求的 url 路径与后面的字符串完全相等时，才会命中。
* /[path] 匹配 /[path]
* ~ 表示该规则是使用正则定义的，区分大小写。
* ~* 表示该规则是使用正则定义的，不区分大小写。
* ^~ 表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找。

常用的写法
表示不区分大小写匹配gif|jpg|jpeg结尾的文件
location ~* \.(gif|jpg|jpeg)$ {
    [ configuration E ]
}

参考地址：
https://juejin.im/post/5cbe89b6f265da0373718707


## LINUX安装nginx详细步骤
https://blog.csdn.net/t8116189520/article/details/81909574

[/usr/local/nginx/logs/nginx.pid 路径下找不到nginx.pid](https://blog.csdn.net/solly793755670/article/details/70742011)

## expires过期时间设置

```
expires 30s;   #缓存30秒
expires 30m;  #缓存30分钟   
expires 2h;     #缓存2小时
expires 30d;    #缓存30天
```

## 502错误

502 错误一般是后端服务出错了，或者ngnix配置有问题，比如端口、域名等
