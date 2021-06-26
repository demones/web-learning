# MySQL

## 安装

1. 使用 brew install mysql 安装
2. 官方客户端 workbench <https://dev.mysql.com/downloads/workbench/>
3. App store sequel Ace

## 启动

```sql
mysql.server start
# 服务常驻后台
brew services start mysql
```

## 配置文件

执行命令查找mysql配置文件路径

 ```shell
 mysql --verbose --help | grep my.cnf
 ```

通过brew安装的配置文件路径为：/usr/local/etc/my.cnf

## 连接

退出MySQL命令： exit 或 quit（回车）

```sql
mysql -uroot -p /*如果刚安装好MySQL，root是没有密码的*/
mysql> exit; // exit 或 quit
mysql> quit;
```

## 设置、修改密码

```sql
mysqladmin -uroot -p password newpassword
```

如果是第一次设置，-p 可以去掉，因为初始 root 没有密码

## 参考

* [MySQL基础 — 常用命令](https://blog.csdn.net/qq_38328378/article/details/80858073)

## 解决 ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)

执行

```sql
mysql --verbose --help | grep my.cnf
mysql -uroot
```

## 解决 报错Client does not support authentication protocol requested by server

1、use mysql(数据库名);

2、alter user 'root'@'localhost' identified with mysql_native_password by '';

3、flush privileges;

## root 密码忘记如何修改

以下方式适合 mysql 8 以上版本

1. ```mysql -uroot -p``` 回车无密码登录
2. 执行命令 ```flush privileges;```
3. 修改密码 ```SET PASSWORD FOR root@localhost = '123456';```，修改成功后退出 ```exit;```
4. 重启服务 ```mysql.server restart```
5. 输入密码登录mysql  ```mysql -uroot -p```

本地数据库密码为：admin123456
