# vite + vue3 搭建

[vite 官网](https://cn.vitejs.dev/)

## 说明

* 部分设置参考了 vue3 cli 生成的模板，包含 eslint

## 基于模板初始化

```shell
npm init vite@latest vite-vue3-example -- --template vue-ts
cd vite-vue3-example
npm install
```

## 修改[配置文件](https://cn.vitejs.dev/config/)

### 设置别名

``` typescript
import { resolve } from 'path';
{
  // ...
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}
```

### 设置server选项

``` typescript
{
  // ...
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}
```

## 多页面应用模式

官方地址：<https://cn.vitejs.dev/guide/build.html#multi-page-app>

默认在根目录下会创建一个 index.html 作为入口文件，如果我们有多个入口文件时，可以在根目录下创建多个，比如 examples/index.html、platform/index.html 等，同时在 src 增加 pages 文件夹，用来管理多页面入口

注意：不能直接创建 examples.html 或 platform.html，必须是文件夹 + index.html

src 文件夹下文件目录结构变成

├── assets
│   └── logo.png
├── components
│   └── HelloWorld.vue
├── env.d.ts
└── pages
    ├── examples
    │   ├── index.ts
    │   └── index.vue
    └── main
        ├── index.ts
        └── index.vue

vite.config.ts 对应的设置为

``` typescript
{
  // ...
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        examples: resolve(__dirname, 'examples.html')
      }
    }
  },
}
```

参考

* https://juejin.cn/post/6985500915969032222
* https://github.com/YuanDaoDao001/vue3-vite-typescript-eslint

## vue-router

```shell
npm install vue-router@4
```

在每个入口页面中增加 router.ts 文件

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import About from '@/pages/main/views/about/index.vue';

const routes: RouteRecordRaw[] = [
  // 动态引入
  {
    name: 'home',
    path: '/',
    component: () => import('@/pages/main/views/home/index.vue')
  },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
```

对应的入口文件 index.ts

```typescript
import { createApp } from 'vue'
import App from './index.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
```

此时目录结构为：

├── assets
│   └── logo.png
├── components
│   └── HelloWorld.vue
├── env.d.ts
└── pages
    ├── examples
    │   ├── index.ts
    │   ├── index.vue
    │   ├── router.ts
    │   └── views
    └── main
        ├── index.ts
        ├── index.vue
        ├── router.ts
        └── views
            ├── about
            │   └── index.vue
            └── home
                └── index.vue

## vuex

```shell
npm install vuex@next
```

## sass

```shell
npm install --save-dev sass
```

## eslint

参考 vue3-cli 生成的默认设置

需要安装以下依赖

```shell
npm install --save-dev eslint eslint-plugin-vue vue-eslint-parser @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base
```

由于 eslint-config-airbnb-base 依赖 eslint-plugin-import 和 eslint-import-resolver-node，所以还需安装这两个包

```shell
npm install --save-dev eslint-plugin-import eslint-import-resolver-node
```

.eslintrc.js

* eslint-plugin-vue 设置

  ```js
  {
    extends: ['plugin:vue/vue3-essential']
  }
  ```

* eslint-config-airbnb-base 设置

  ```js
  {
    extends: ['eslint-config-airbnb-base']
  }
  ```

* @typescript-eslint/eslint-plugin 和 @typescript-eslint/parser

  ```js
  {
    extends: ['plugin:@typescript-eslint/eslint-recommended']
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
      generators: false,
      objectLiteralDuplicateProperties: false,
    },
    sourceType: 'module'
  },
  ```

如果想看最终eslint config生成，可以debug查看，对应的文件为：

node_modules/eslint/lib/linter/linter.js 方法 verify，然后再进入_verifyWithConfigArray

关于 eslint 命令行一点小常识

* 同时检测多个后缀

  ```shell
    eslint src --fix --ext .vue --ext .ts -ext .js
    # 或者
    eslint src --fix --ext .vue,.ts,.js
  ```

* 同时检测多个文件夹

  ```shell
    eslint src server --fix --ext .vue,.ts,.js
  ```

## stylelint

检测 css 样式书写规范性

需要安装以下依赖

```shell
npm install --save-dev stylelint stylelint-config-standard stylelint-order stylelint-scss
```

参考

* [官方](https://stylelint.io/)
* [中文][https://stylelint.docschina.org/]

## Vue3 Jsx 支持

```shell
npm i @vitejs/plugin-vue-jsx -D
```

注册插件，vite.config.js

```shell
import vueJsx from '@vitejs/plugin-vue-jsx'

export default {
  plugins: [vue(), vueJsx()],
}
```

## element plus 组件

```shell
npm install element-plus --save
```

### 自动导入

First you need install unplugin-vue-components.

```shell
npm install unplugin-vue-components
```

vite.config.ts 设置

```shell
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    // ...
    Components({
      resolvers: [ElementPlusResolver({
          importStyle: 'sass'
        })],
    }),
  ],
}
```

### 手动导入

手动导入需要安装插件 unplugin-element-plus

```shell
npm install --save-dev unplugin-element-plus
```

vite.config.ts 设置

```shell
import ElementPlus from 'unplugin-element-plus/vite'

export default {
  plugins: [ElementPlus()],
}
```

## node 服务端

### koa

为了摄取更多优秀开源组件，我们使用koa，需要安装以下依赖

```shell
npm install --save koa @koa/router koa-views
```

#### koa 中间件

@koa/router

参考：

* [官网](https://koajs.com/)
* [中文网址](https://koa.bootcss.com/)
* [koa实践总结，总有你用的到抄的走的](https://juejin.cn/post/6952665400890884127)
  这个讲的比较详细，值的一看，对应完整代码: <https://github.com/JustGreenHand/koa-app>
* [基于koa的项目实践](https://juejin.cn/post/7017711750380257316)
  跟上一个参考文章内容类似，不知道是谁抄谁
* [阮一峰-Koa 框架教程](http://www.ruanyifeng.com/blog/2017/08/koa.html)
* [koa源码解析](https://juejin.cn/post/7016587795510607879)

#### koa 执行流程分析

##### 执行顺序

先上官方代码，为了标识执行顺序，额外的增加了日志打印，从打印结果看，在调用 next()之前的代码是按顺序执行的，
当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有中间件执行后，再从堆栈中向上处理中间件，
并执行对应功能，对于 next() 的调用可以理解为后进先出

```javascript
const Koa = require('koa');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  console.info(1);
  await next();
  console.info(5);
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  console.info(2);
  const start = Date.now();
  await next();
  console.info(4);
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
  console.info(3);
  ctx.body = 'Hello World';
});

app.listen(3000);
```

注意：上面的代码与异步无关，即使是去掉了 async 和 await，也遵循执行顺序

##### 啥时候使用 next()

如果接下来还需要执行中间件，则需要在上一个中间件中调用 next()，如是最后一个中间件，则不需要再调用 next()

常见中间件书写顺序

1. 设置一些格式化中间件，比如
2. 处理日志中间件
3. 处理登录、权限中间件
4. 处理 api 路由中间件，改中间件需要判断是否是 api 接口，如不是或报错则 next()
5. 页面中间件
6. 异常中间件

### 日志 winston

```shell
npm install --save winston
```

增加中间件，/server/middlewares/logger/index.js

参考：

* <https://github.com/yidinghan/koa2-winston>

### 后台请求接口 got

```shell
npm install --save got
```

### node 服务守卫助手 nodemon

```shell
npm install --save-dev nodemon
```

### node 服务端支持 Typescript

使用 tsc 实时编译

参考：

* <https://github.com/Microsoft/TypeScript-Node-Starter>

## ssr 支持

## axios

## mock

## 单元测试

```shell
npm install --save-dev mocha chai @types/mocha @types/chai
```

## typescript cli

## 动态修改 typescript 对应配置文件

默认为 tsconfig.json，可以通过命令来修改

```shell
// 通过 cli 参数 p 来修改
tsc -p ./server-tsconfig.json -w
```

对应的环境变量为 TS_NODE_PROJECT

例如 mocha 测试ts文件时，需要修改默认的 tsconfig.json 时就可以使用环境变量

```shell
TS_NODE_PROJECT='./server-tsconfig.json' mocha
```

还可以直接使用 TS_NODE_COMPILER_OPTIONS 来配置 ts config

```shell
"test": "env TS_NODE_COMPILER_OPTIONS='{\"module\": \"commonjs\" }' mocha -r ts-node/register 'tests/**/*.ts'"
```

参考：

* <https://www.npmjs.com/package/ts-node#tsconfig>
* <https://dev.to/matteobruni/mocha-chai-with-typescript-37f>
