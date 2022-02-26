# npm 学习笔记

## npm 常用命令

* npm init 初始化
* npm publish 发布
* npm unpublish 取消发布

  ```shell
  npm unpublish [<@scope>/]<pkg>[@<version>]
  ```

* npm deprecate 废弃

  ```shell
  npm deprecate <pkg>[@<version>] <message>
  ```

* npm link 本地 link
* npm config list 配置信息
* .npmignore 忽略不要发布的文件
* prepublishOnly 发布前执行的命令
* npm whoami 登录信息
* npm login 登录
* npm outdated 版本更新情况
* npm view sass versions 查看某一资源线上版本

## package.json 详解

* [官方地址](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)
* [中文文档](https://www.axihe.com/api/npm/config/package.html)

这里主要介绍几个关键属性的使用，常用的和不常用的可以参见以上文档链接地址，里面有详细介绍

### main

指引入该模块时指定的入口文件，如果您的包名为 foo，引入时 ```import foo from 'foo';```，会自动引入 main 设置的文件

```json
{
  "main": "lib/index.js"
}
```

注意：一般 main 指向的文件是 es5 编译的 js，基于 CommonJS

### module

同 main，只是 module 指向的文件是 es6 规范编译的 js 或 mjs，即支持直接使用 ```import``` 导入

参考文档

* https://github.com/SunshowerC/blog/issues/8
* https://github.com/nodejs/node-eps/blob/4217dca299d89c8c18ac44c878b5fe9581974ef3/002-es6-modules.md#51-determining-if-source-is-an-es-module

### exports

"exports" 字段提供了 "main" 的替代方案，其中可以定义包主入口点，同时封装包，防止除 "exports" 中定义的入口点之外的任何其他入口点。 这种封装允许模块作者为他们的包定义一个公共接口。

如果同时定义了 "exports" 和 "main"，则 "exports" 字段优先于 "main"。 "exports" 不特定于 ES 模块或 CommonJS；如果 "exports" 存在，则 "main" 将被覆盖。 因此 "main" 不能用作 CommonJS 的后备，但它可以用作不支持 "exports" 字段的旧版 Node.js 的后备。

* 官方说明：http://nodejs.cn/api/packages.html
* https://zhuanlan.zhihu.com/p/159202959

## npm 基本用法和实用技巧

参考 <https://github.com/theicebear/npm-basic-usage>
