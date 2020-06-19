# node

如果不考虑版本的问题，需要定期升级 node 的话，考虑从官方安装，然后设置其环境变量，这样每次升级后，不用重新安装全局 npm 模块

官方下载的安装包，默认安装路径为 /usr/local/bin/node 和 /usr/local/bin/npm  。
安装全局包路径： /usr/local/lib/node_modules/

如果考虑版本的切换，可以使用 nvm 来安装和管理各版本

## npm 常见命令

   * ```npm ls -g --depth=0``` 查询深度为0的全局列表
   * ```npm update -g npm``` 升级 npm
   * ```npm ls -g --depth=1 2>/dev/null | grep generator-``` 查询深度为1的全局 npm 包， > 表示重定向，1 标准输出，2 标准输出错误信息，2>/dev/null 表示把错误信息重定向到 null 设备中，即不输出。| 表示通道，把上一个命令的输出内容作为下一个命令的输入内容，grep generator- 检索 generator- 开头的信息
   * ```npm link``` 把当前 npm 工程 link 到 npm module 全局中，主要供开发时使用，与之对应的取消 link 命令为 ```npm unlink```

## 设置镜像

1.原npm地址

npm config set registry http://registry.npmjs.org

2.设置国内镜像

a.通过config命令

npm config set registry https://registry.npm.taobao.org

b.命令行指定

npm --registry https://registry.npm.taobao.org install xxx

c.编辑 ~/.npmrc 加入下面内容

registry = https://registry.npm.taobao.org
