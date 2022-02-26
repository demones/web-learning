# vue3

## vue3 知识点

### app.use()

Installs a plugin.

```typescript
interface App {
  use(plugin: Plugin, ...options: any[]): this
}
```

Details

Expects the plugin as the first argument, and optional plugin options as the second argument.

The plugin can either be an object with an install() method, or a directly a function (which itself will used as the install method). The options (second argument of app.use()) will be passed along to the plugin's install method.

When app.use() is called on the same plugin multiple times, the plugin will be installed only once.

Example

```typescript
import { createApp } from 'vue';

const app = createApp({});

// 示例省略了组件的具体实现
const customComp = {
  name: 'Button'
};
customComp.install = (app) => {
  const { name } = customComp;
  app.component(name, customComp);
};

const myPlugin = {
  install(app, options) {
    // configure the app
  }
};

app.use(myPlugin, {
  /* optional options */
});
```

### app.component()

* 组件全局注册，使用 ```PascalCase``` 命名规范注册
* 使用时，可以使用 ```PascalCase``` 或 ```kebab-case```，强力推荐使用后者
* 不论使用 ```PascalCase``` 还是 ```kebab-case```，vue 解析会自动解析为 ```kebab-case```
* HTML 标签和属性名称是不分大小写的，所以浏览器会把任何大写的字符解释为小写
* 闭合标签，```<my-component />```，在模板中不能使用闭合标签，我们必须显式地写出关闭标签，```<my-component></my-component>```，这是因为 HTML 只允许一小部分特殊的元素省略其关闭标签，最常见的就是 ```<input/>``` 和 ```<img/>```。对于其他的元素来说，如果你省略了关闭标签，原生的 HTML 解析器会认为开启的标签永远没有结束。

示例

```html
<MyComponent></MyComponent>
<my-component></my-component>
```

## vue3 源码分析

## Vue3.0 中的 monorepo 管理模式

<https://juejin.cn/post/6844903961896435720>
