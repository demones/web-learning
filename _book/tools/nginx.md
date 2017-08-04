# nginx 学习笔记

* 本地安装路径 /usr/local/etc/nginx
* 启动命令 nginx
* 重启命令 nginx -s reload
* 关闭命令 nginx -s stop


## 问题

* 当提示 nginx [emerg] no "events" section in configuration ，则需要设置
  ```
    events {
     worker_connections  1024;
    }
  ```
