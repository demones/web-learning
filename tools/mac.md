# mac 学习笔记

## 知识点整理

* 启动80端口必须用 sudo 权限

## mac 相关命令

### which 定位命令所对应的路径，比如 `which node`
### 查看占用的端口 sudo lsof -i -P | grep -i "listen"
### 杀死进程 sudo kill -9 8900       8900 表示对应的 PID

### 解压 tar.xz结尾的压缩文件

* xz -d name.tar.xz
* tar -xvf name.tar

## 设置环境变量 path 路径

方法1：

```
export PATH=/usr/local/xxx/bin:$PATH  
echo $PATH >> ~/.bash_profile  
```
如果只是临时的可以不需要下面这段

echo $PATH >> ~/.bash_profile  

方法2：编辑文件 ~/.bash_profile，添加要加入的path，重启终端。  


## 学习参考

* [深入浅出 Mac OSX 中文教程](http://list.youku.com/albumlist/show?id=18654878&ascending=1&page=1)

## node 设置
export PATH=/Users/wangyanjun/development-tools/mongodb-osx-x86_64-3.2.8/bin:$PATH  
echo $PATH >> ~/.bash_profile
