# url 中 hash 和参数解析

## 原生写法

原生写法 url 中 ? 在前 # 在后，

示例：

http://qd-visual.jd.com:8080/examples?source=pc#/probe

原生 location

```javascript

{
  hash: '#/probe',
  search: '?source=pc'
}
```

vue this.$route

```javascript

{
  hash: '',
  query: {},
  path: '/probe'
}
```

react this.props.location

```javascript

{
  hash: '',
  search: '',
  pathname: '/probe'
}
```

对于路由中带参数的形式，比如 /probe/:id

vue 和 react 取值方式为

* vue: this.$route.params.id
* react: this.props.match.params.id

## vue 和 react 写法

考虑到 hash 路由作为一个页面来看，vue 和 react 写法为 # 在前 ? 在后，即 # 后面是一个独立的路径（包含参数）


示例：

http://qd-visual.jd.com:8080/examples#/probe?source=pc

原生 location

```javascript

{
  hash: '#/probe?source=pc',
  search: ''
}
```

vue this.$route

```javascript

{
  hash: '',
  query: {source: "pc"},
  path: '/probe'
}
```

react this.props.location

```javascript

{
  hash: '',
  search: '?source=pc',
  pathname: '/probe'
}
```

## 对比分析

* 原生写法时，不论是 vue 还是 react，通过属性值是无法取到 url 中 ？后面的值
* vue 和 react 写法时，vue 通过 ```this.$route.query```取值，react 通过 this.props.location.search 取值
* 对于单页面来说，#号后面的值作为一个路由，包含了 path、params 和（query 或 search）

结论：
* 当前大部分使用了单页面模式，取 # 号在前 ? 号在后的路径即可，这种写法也可以作为奇点规范化中的一条
* 对于 ? 号在前 # 号在后的写法，虽然 vue 和 react 也能正确解析，但通过 vue react 自身的变量拿不到 ? 后的参数，只能通过 原生 location 拿到，在 vue 或 react 不需要处理这些参数时，写法也可以，但不推荐
* 最好的方式是 hash 路由改成 history 路由，这也可以作为奇点规范化中的一条
