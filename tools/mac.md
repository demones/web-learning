# mac 学习笔记

## 知识点整理

* 启动80端口必须用 sudo 权限

## mac 相关命令

### cat 查看文件内容，比如查看 host 内容  cat /etc/hosts
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

## linux 系统下安装 rz 命令 `yum -y install lrzsz` ，使用 `yum -y install` 可以安装其他命令

## 安装后 zsh oh-my-zsh 后，一些命令找不到解决方法，比如 nvm，

在 .zshrc 中加入如下设置

export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh

oh-my-zsh 主题：  ls ~/.oh-my-zsh/themes 修改主题，在 .zshrc 中修改 ZSH_THEME="robbyrussell" 即可

oh-my-zsh 插件：  ls ~/.oh-my-zsh/plugins 修改插件，在 .zshrc 中修改 plugins=(git github gulp nvm npm node brew cp) 即可

## tail 命令

tail -50f filename 表示查看后 50行内容

tail filename |grep "搜索的内容" -a(或-b 或-c)   -a 表示从前查找，-b 从后查找 -c 表示从前后查找
