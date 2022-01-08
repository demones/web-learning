# mac 实用技能

## mac 相关命令

### cat 查看文件内容

示例：查看 host 内容  ```cat /etc/hosts```

### which 定位命令所对应的路径

示例： ```which node```

### 查看占用的端口

```shell
sudo lsof -i -P | grep -i "listen"
# 也可以用这个命令
sudo ps -ef |grep [关键字]
```

### 杀死进程

```shell
# 17967 表示对应的 PID
sudo kill -9 17967
```

### 解压tar.xz文件

```shell
xz -d name.tar.xz
tar -xvf name.tar
```

### tar 压缩文件

```shell
tar zcvf fileName.tar.gz folder
```

## grep 命令查询文件内容

```shell
grep "keyword" path/filename.txt
```

查询 / 关键字，快捷键 n 查找下一个，也可以使用 grep 在指定文件中查询

## 设置环境变量 path 路径

方法1：

```shell
export PATH=/usr/local/xxx/bin:$PATH
# 写入到 ~/.bash_profile 中
echo $PATH >> ~/.bash_profile
```

如果只是临时的可以不需要下面这段

```echo $PATH >> ~/.bash_profile```

方法2：编辑文件 ~/.bash_profile，添加要加入的path，重启终端。

### node 环境变量设置

```shell
export PATH=/Users/username/development-tools/mongodb-osx-x86_64-3.2.8/bin:$PATH
echo $PATH >> ~/.bash_profile
```

## linux 系统下安装 rz 命令

`yum -y install lrzsz`

使用 `yum -y install` 可以安装其他命令

## tail 命令

```shell
tail -50f filename # 表示查看后 50行内容
tail filename |grep "搜索的内容" -a(或-b 或-c) # -a 表示从前查找，-b 从后查找 -c 表示从前后查找
```

## chmod 命令

用来设置文件权限

* 查看文件权限

  ls -l 命令可以查看当前目录下所有文件的访问权限，也可以查看指定文件，比如，查看某一目录下 startup.sh 文件的访问权限

  ```shell
    ls -l startup.sh
    -rwxrwxrwx@ 1 root wheel 1904 9 27 18:32 startup.sh
  ```

  上面打印的文件信息中每一部分所代表的含义，分别对应如下解释：

  1. 文件类型和访问权限 文件数量 所属用户 所在群组 文件大小 修改日期（月 日 时 分） 文件名称
  2. 第一部分详细说明一下，就以 “-rwxrwxrwx” 为例：第一个符号代表文件类型， “-” 符号表示该文件是非目录类型，“d” 符号表示目录类型；（ 末尾的 @ 符号表示文件拓展属性，属于文件系统的一个功能。）后面九个字母分为三组，从前到后每组分别对应所属用户（user）、所属用户所在组（group）和其他用户（other）对该文件的访问权限； 每组中的三个字符 “rwx” 分别表示对应用户对该文件拥有的可读／可写／可执行权限，没有相应权限则使用 “-” 符号替代。

* 修改访问权限

  根据上面查看权限部分的介绍，修改权限也应包括访问用户、添加或取消操作、具体权限和访问文件，即：chmod 用户+操作+权限 文件

  1. 用户部分：使用字母 u 表示文件拥有者（user），g 表示拥有者所在群组（group），o 表示其他用户（other），a 表示全部用户（all，包含前面三种用户范围）；
  2. 操作部分：“+” 符号表示增加权限，“-” 符号表示取消权限，“=” 符号表示赋值权限；
  3. 权限部分：“r” 符号表示可读（read），“w” 表示可写（write），“x” 表示可执行权限（execute）；
  4. 文件部分：如不指定文件名，表示操作对象为当前目录下的所有文件。

  还以前面 startup.sh 文件为例，将拥有者所在群组和其他用户改为可读可写权限、取消可执行权限的使用方式为：

  ```shell
    chmod go-x startup.sh
  ```

  修改后，权限变为

  ```shell
    ls -l startup.sh
    -rwxrw-rw-@ 1 root wheel 1904 9 27 18:32 startup.sh
  ```

  如果是复杂一点操作的话，可以同时使用多种操作符添加和取消权限，并且可以使用 “,” 符号同时对不同用户范围修改权限，比如：

  ```shell
    chmod g+x,o+x-w startup.sh
  ```

* 用数字设置权限

  还有一种简单的写法，使用数字表示权限部分的读／写／可执行权限类型。数字和权限类型的对应关系，可以从下图中直观地看出来

  ![chmod权限图解](/assets/tools/chmod.png)

  即，1 表示可执行，2 表示可写，4 表示可读。每种类型数字相加所得到的值表示交叉部分的公共类型。
  这样的话，使用三个数字便可以分别代表三种不同用户类型的权限修改结果。比如，修改所有用户的访问权限均为可读可写可执行（rwx）的话，这样使用即可：

  ```shell
    chmod 777 startup.sh
  ```

  三个数字从前到后分别表示 u、g、o 三种用户类型的访问权限，使用时按需修改。补充一点，有时候需要递归修改目录文件及其子目录中的文件类型，可以使用 -R 选项。

  ```shell
    chmod -R 777 file
  ```

  -R 表示递归设置，777 表示最高权限，file 指文件或文件夹
  考虑到安全，一般不建议使用 777 来设置，按需设置即可

## curl 命令

检测 url 是否能访问通

示例：```curl url```

## dig 命令

dig命令是常用的域名查询工具，可以用来测试域名系统工作是否正常

### 语法

```dig(选项)(参数)```

### 选项

```shell
@<服务器地址>：指定进行域名解析的域名服务器；
-b<ip地址>：当主机具有多个IP地址，指定使用本机的哪个IP地址向域名服务器发送域名查询请求；
-f<文件名称>：指定dig以批处理的方式运行，指定的文件中保存着需要批处理查询的DNS任务信息；
-P：指定域名服务器所使用端口号；
-t<类型>：指定要查询的DNS数据类型；
-x<IP地址>：执行逆向域名查询；
-4：使用IPv4；
-6：使用IPv6；
-h：显示指令帮助信息。
```

### 参数

```shell
1 主机：指定要查询域名主机；
2 查询类型：指定DNS查询的类型；
3 查询类：指定查询DNS的class；
4 查询选项：指定查询选项。
```

### 示例

```shell
[root@Zhe_JinHua_EDU_01 data]# dig @114.114.114.114 www.baidu.com

; <<>> DiG 9.8.2rc1-RedHat-9.8.2-0.62.rc1.el6 <<>> @114.114.114.114 www.baidu.com
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 46432
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;www.baidu.com.            IN    A

;; ANSWER SECTION:
www.baidu.com.        116    IN    CNAME    www.a.shifen.com.
www.a.shifen.com.    202    IN    A    180.97.33.107
www.a.shifen.com.    202    IN    A    180.97.33.108

;; Query time: 58 msec
;; SERVER: 114.114.114.114#53(114.114.114.114)
;; WHEN: Tue Apr 17 02:44:40 2018
;; MSG SIZE  rcvd: 90
```

## 常用软件

### node

npm 安装包缓存 ~/.npm 删除即可

### postman

<https://www.postman.com/downloads/>

## 如何修改Mac主机名和计算机名

对于 Mac OS 来说，主机名和计算机名是不同的概念，因为 Mac OS 可以通过“计算机名”来自定义主机在局域网内显示的名称，而 Mac OS 下的“主机名”才是主机真正的名称。

查看主机名 ```echo $HOSTNAME```
修改主机名 ```sudo scutil --set HostName 新的主机名```

修改当前主机在局域网内显示的计算机名
我们通过自定义 Mac OS 下的“计算机名”，即 ComputerName 值来实现，有两种方法：

1. 在“系统偏好设置”——“共享”下，修改电脑名称, JRMD52T9MD6M
2. 在终端下，通过命令实现

```shell
sudo scutil --set ComputerName 新的计算机名
```

参考 <https://www.jianshu.com/p/dbf2fa105f26>

## 如何删除__MACOSX目录

mac 系统中压缩后的 zip 文件如果有__MACOSX 目录，可以执行以下命令来删除

```shell
zip -d file.zip __MACOSX/\*
```

file.zip 是要删除的压缩文件
zip 命令详解 <https://www.cnblogs.com/machangwei-8/p/9572227.html>
zip -r ./file.zip ./files/* 递归压缩文件夹下所有文件，包括子文件

## 学习参考

* [深入浅出 Mac OSX 中文教程](http://list.youku.com/albumlist/show?id=18654878&ascending=1&page=1)
