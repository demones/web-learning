# es.next 学习笔记

## 总结 es.next 新语法、新功能

主要整理还没有掌握的一些知识点，方便以后的开发

### Babel 常见知识点整理

* Babel相关库
  * 核心库：```@babel/core```
  * 命令行工具：```@babel/cli```
  * 即时编译钩子：```@babel/register```
  * 预设 ```@babel/preset-env```
    需要配合 .browserslist 来转换语法，详细说明可以看这里 <https://juejin.cn/post/6947512125648535583>
    useBuiltIns 有三个参数，"usage" | "entry" | false，用来怎样加载 polyfill
    需要注意的是，@babel/polyfill 在babel v7.4.0之后版本会被废弃，官方建议直接引入corejs，并且在options中指定corejs版本。

    ```json
    {
      "presets": [
        [
          "@babel/env",
          {
            "useBuiltIns": "usage",
            "corejs": 3
          }
        ]
      ]
    }
    ```

    如果编译项目，建议useBuiltIns设为usage，编译工具类，比如奇点JS SDK可设为false，不引入polyfill

    编译会根据 .browserslistrc的设置，引入所需的 polyfill和对语法进行编译
  * ```core-js```  和 ```regenerator-runtime```  新版本不使用 polyfill，而使用 core-js 和 regenerator-runtime
  * 插件
    ```@babel/plugin-transform-runtime``` 和 ```@babel/runtime```
    参考
    * <https://segmentfault.com/a/1190000021188054>
    * <https://www.jianshu.com/p/50e8a508ccc4>

* Babel 转换机制
  默认只转换新的 JavaScript 语法（syntax），而不转换新的 API，比如Iterator、Generator、Set、Map、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
  
  举例来说，ES6 在Array对象上新增了Array.from方法。Babel 就不会转码这个方法。如果想让这个方法运行，可以使用core-js和regenerator-runtime(后者提供generator函数的转码)，为当前环境提供一个垫片。

* [Babel 在线编译器](https://babeljs.io/repl/)

### let 和 const 命令

* 暂时性死区
  只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

  ```javascript
    var tmp = 123;

    if (true) {
      tmp = 'abc'; // ReferenceError
      let tmp;
    }
  ```
  
  上面代码会报错，“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。

  ```javascript
    typeof x; // ReferenceError
    let x;
  ```

  作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。```typeof undeclared_variable // "undefined"```

### 解构赋值

```javascript
let [foo, [[bar], baz]] = [1, [[2], 3]]; // 嵌套
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

数组的解构赋值，如果等号的右边不是数组（或者严格地说，不是可遍历的结构，继承接口Iterator），那么将会报错。

```javascript
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

```javascript
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"
```

可以指定默认值，只有数组成员严格等于 undefined，才取默认值

```javascript
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

已定义的变量，如何解构赋值

```javascript
let a; 
([a] = [1,2])
```

对象解构赋值可以修改变量名

```javascript
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined
```

嵌套赋值

```javascript
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```

对于嵌套赋值，如果p也要作为变量赋值，需要单独申明，如上面例子

对已定义的变量，也可以这样赋值，表达式需要加括号括起来

```javascript
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj // {prop:123}
arr // [true]
```

还可以这样

```javascript
let b; 
({b} = {b:1});

let c; 
({b: c} = {b:1});
```

如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。

```javascript
// 报错
let {foo: {bar}} = {baz: 'baz'};
```

字符串也支持解构赋值

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

```javascript
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

函数参数也可以解构赋值，参数分为对象和数组情况

```javascript
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

### 数值

Number.isFinite()、Number.isNaN() 与 isFinite()、isNaN() 的不同

它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。

Number.isInteger()

JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。

```javascript
Number.isInteger(25) // true
Number.isInteger(25.0) // true
```

安全整数和 Number.isSafeInteger()

```javascript
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```

BigInt 数据类型

可以表示大整数，以n结尾

```javascript
const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b // 33334444555566667777n

// 普通整数无法保持精度
Number(a) * Number(b) // 33334444555566670000
```

### 函数

函数的 length 属性，返回没有指定默认值的参数个数

rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错

```javascript
// 报错
function f(a, ...b, c) {
  // ...
}
```

箭头函数使用注意事项

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

```javascript
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
```

[尾调用优化](https://es6.ruanyifeng.com/#docs/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96)

尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

```javascript
function f(x){
  return g(x);
}
```

### 数组

可以使用扩展运算符 ... (spread) 来操作数组中的元素

```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

函数的情况

```javascript
function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42
```

扩展运算符后面还可以放置表达式

```javascript
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];
```

扩展运算符除了可以操作数组，还可以操作任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组。

```javascript
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];

Number.prototype[Symbol.iterator] = function*() {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
}
console.log([...5]) // [0, 1, 2, 3, 4]
```

Map 和 Set 结构，Generator 函数 都可以使用扩展运算符

```javascript
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]

const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
```

扩展运算符只能操作数组或者实现了接口Iterator的对象，如果我们想操作类似数组的对象（array-like object），即包含属性length的对象，这时可以使用Array.from将类似数组转为真正的数组

```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

当然 Array.from 可以将实现了Iterator 接口的对象转换为真正数组

```javascript
function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']
```

Array.of()方法用于将一组值，转换为数组。

```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

### 对象

简写的对象方法不能用作构造函数，会报错

```javascript
const obj = {
  f() {
    this.foo = 'bar';
  }
};

new obj.f() // 报错
```

属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

（1）for...in

for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

（2）Object.keys(obj)

Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

（3）Object.getOwnPropertyNames(obj)

Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

（4）Object.getOwnPropertySymbols(obj)

Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

（5）Reflect.ownKeys(obj)

Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

* 首先遍历所有数值键，按照数值升序排列。
* 其次遍历所有字符串键，按照加入时间升序排列。
* 最后遍历所有 Symbol 键，按照加入时间升序排列。

```javascript
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```

上面代码中，Reflect.ownKeys方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性2和10，其次是字符串属性b和a，最后是 Symbol 属性。

链判断运算符  ```?.```，会判断是否不为 null 或 undefined

```javascript
const firstName = message?.body?.user?.firstName || 'default';
const fooValue = myForm.querySelector('input[name=foo]')?.value
```

Null 判断运算符 ```??```

它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值。

```javascript
const headerText = response.settings.headerText ?? 'Hello, world!';
const animationDuration = response.settings.animationDuration ?? 300;
const showSplashScreen = response.settings.showSplashScreen ?? true;
const animationDuration = response.settings?.animationDuration ?? 300;
```

## 参考资料

* [介绍 es.next 语法帖子](http://www.2ality.com/)
