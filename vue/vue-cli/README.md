# vue cli 相关

## 构建默认选项

? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, TS, Router, Vuex, Linter, Unit, E2E
? Use class-style component syntax? No
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a linter / formatter config: Standard
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Mocha
? Pick an E2E testing solution: Cypress
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files

## vue-cli-server 参数说明

vue-cli-service 提供了 serve 和 build 两大命令，每个命令有对应的可选参数，可以执行以下命令来查看

```shell
vue-cli-service build help
```

官方地址有详细说明

https://cli.vuejs.org/zh/guide/cli-service.html

## 现代模式

设置参数 --modern 开启现代模式，打包后，对于现代浏览器运行速度更快

## 查看打包后文件大小

设置参数 --report 可以在结果输出文件大小，从而定位大文件

## 查看解析后的 Webpack 配置
执行命令

```shell
vue inspect > output.js
```

具体可查看官方文档 https://cli.vuejs.org/zh/guide/webpack.html#%E5%AE%A1%E6%9F%A5%E9%A1%B9%E7%9B%AE%E7%9A%84-webpack-%E9%85%8D%E7%BD%AE

## 查看生成的webpack配置文件

* vue inspect
  可以查看所有的配置，```vue inspect > output.js```，会把配置输出到 output.js 文件中
* vue inspect --rules
  列出对应的配置规则
* vue inspect --rule vue
  对应某一规则详情
