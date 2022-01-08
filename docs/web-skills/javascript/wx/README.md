# 微信小程序

## npm + ts 环境搭建

   搭建过程有点小坑，不过通过查看文档和前人踩得坑基本上能搞定，下面给出具体流程

* 首先安装最新版小程序开发工具
* 新建项目：开发模式选择小程序，语言选择 TypeScript
* 详情、本地设置中选择调试基础库，可选择最新的，勾选使用npm模块
* 修改 node 和 npm 软链，见上面说明
* 由于最新版创建的 typescript 模板小程序应用自动引入了 typings，故需要把 miniprogram-api-typings 去掉
* 升级npm依赖，修改 typescript 最新版本，然后执行以下命令

  ```shell
    rm -rf node_modules
    npm install
  ```

* 引入第三方UI库，以 vant-weapp 为例

  ```shell
      npm install @vant/weapp --save
  ```

* 修改 project.config.json npm 构建

    ```json
    {
      ...
      "setting": {
        ...
        "packNpmManually": true,
        "packNpmRelationList": [
          {
            "packageJsonPath": "./package.json",
            "miniprogramNpmDistDir": "./miniprogram/"
          }
        ]
      }
    }
    ```

* 修改 tsconfig.json 加入以下typescript设置

  ```json
  {
    ...
    "compilerOptions": {
      ...
      "paths": {
        "@vant/weapp/*": ["/path/to/node_modules/@vant/weapp/dist/*"]
      }
    }
  }
  ```

  注意：/path/to 为实际绝对路径，可以执行pwd命令获取

* 工具->构建npm，会在文件夹 miniprogram_npm 下生生成 vant-weapp 组件库
* 引入 vant-weapp 组件库
  下载 vant-weapp 例子 <https://github.com/youzan/vant-demo>，然后把 /vant-weapp/base/pages/ 复制到新建的项目中，
  注意修改组件引入路径，如 @vant/weapp/checkbox/index
* 由于 vant-weapp 不兼容最新的小程序 style 2 版本，故需要把 app.json 中 "style": "v2" 去掉
* 在引入vant Toast Dialog等编译报错的解决方法

  ```javascript
    import Toast from '@vant/weapp/toast/toast';
  ```

  以上为引入方式，报错解决方法是：找到node_modules/@vant/weapp/dist/toast/toast.d.ts文件，删除第一行代码
  ```/// <reference types="miniprogram-api-typings" />``` 即可，同理，其他的也这样处理

## 实时编译

对于typescript每次修改ts文件时，都得点击编译按钮来编译。可以写个监听，当文件改变时，自动编译，我们可以使用npm提供的包 ```npm-watch```.
以下为package.json中配置.

```json
  "scripts": {
    "watch": "npm-watch",
    "compile": "./node_modules/typescript/bin/tsc",
    "tsc": "node ./node_modules/typescript/lib/tsc.js"
  },
  "watch": {
    "compile": {
      "patterns": [
        "miniprogram"
      ],
      "extensions": "ts",
      "delay": 300
    }
  },
```

启动 npm run watch 后，当有ts文件修改时就会执行 npm run tsc命令来实时编译

## 常见错误

1. 报 /bin/sh: npm: command not found 错误解决方案

   node 和 npm 软链，先用which命令找到node 和 npm实际地址

  ```shell
    sudo ln -s  /Users/xxx/.nvm/versions/node/v10.15.3/bin/node /usr/local/bin/node
    sudo ln -s  /Users/xxx/.nvm/versions/node/v10.15.3/bin/npm /usr/local/bin/npm
  ```

  参考地址：<https://developers.weixin.qq.com/community/develop/doc/000c8284bd43786f4c28cd34c5bc00?_at=1568277487538&jumpto=comment&commentid=000a0cf2160760646d6845535510>

## 常见知识点

### openId 和 unionId 获取

<https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html>
