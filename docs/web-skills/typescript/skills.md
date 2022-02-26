# TypeScript 技巧

## 配置 config

### 严格模式

主要有以下三个设置项

* strict 设为 true 开启所有类型检测
* noImplicitAny 设为 true 表示不允许 any 类型，有些严格，视情况开启
* strictNullChecks 设为 true 表示在严格的 null 检查模式下， null 和 undefined 值不包含在任何类型里，只允许用它们自己和 any 来赋值（有个例外， undefined 可以赋值到 void）

### 文字类型

```typescript
function handleRequest(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
  // 省略实现
}

const req = {
  url: 'https://example.com',
  method: 'GET',
};

handleRequest(req.url, req.method);
```

以上代码会报错 ```error TS2345: Argument of type 'string' is not assignable to parameter of type '"GET" | "POST" | "PUT" | "DELETE"'.```

即不能把 string 赋值给文字类型，可以使用类型断言 as 来断言，方法有二

* ```as 'GET'```
* ```as const```

正确的书写

```typescript
function handleRequest(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
  // 省略实现
}

const req = {
  url: 'https://example.com',
  method: 'GET' as 'GET',
};

handleRequest(req.url, req.method);
```

```typescript
function handleRequest(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
  // 省略实现
}

const req = {
  url: 'https://example.com',
  method: 'GET',
};

handleRequest(req.url, req.method as 'GET');
```

```typescript
function handleRequest(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
  // 省略实现
}

const req = {
  url: 'https://example.com',
  method: 'GET',
} as const;

handleRequest(req.url, req.method);
```

### const assertions 断言

简单的理解就是通过 const 断言，转换为单个字面类型

[官方解释](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)

TypeScript 3.4 introduces a new construct for literal values called const assertions. Its syntax is a type assertion with const in place of the type name (e.g. 123 as const). When we construct new literal expressions with const assertions, we can signal to the language that

* no literal types in that expression should be widened (e.g. no going from "hello" to string)
* object literals get readonly properties
* array literals become readonly tuples

TypeScript 3.4 引入了一个名为 const 断言的字面值的新构造。它的语法是一个类型断言，用 const 代替类型名称（例如 123 as const）断言构造新的文字表达式时，我们可以向语言发出以下信号：

* 该表达式中的字面类型不能被扩展，即没有类型扩展的字面类型（例如：不能从“hello”转换为字符串）
* 对象字面量成为只读属性
* 数组字面量成为只读元组

#### 没有类型扩展的字面类型

当我们使用关键字 const 声明一个字面量时，类型是等号右边的文字，例如：

```typescript
const name = 'hello'; // name has the type 'hello'
```

const 关键字确保不会发生对变量进行重新分配，并且只保证该字面量的严格类型。

但是如果我们用 let 而不是 const， 那么该变量会被重新分配，并且类型会被扩展为字符串类型，如下所示：

```typescript
let name = 'hello'; // name has the type string
```

const 和 let 同时

```typescript
const name = 'hello'; // name has the type 'hello'
let hobby = 'math';   // hobby has the type string
```

```hobby``` 被扩展为更通用的类型，并允许将其重新分配给该类型的其他值，而变量 ```name``` 只能具有 'hello' 的值。

如果限制 ```hobby``` 只有字面类型 'math' 时可以用新的 const assertion 功能，我可以这样做：

```typescript
let hobby = 'math' as const;  // hobby has the type 'math'
```

#### 对象字面量成为只读属性

在 Typescript 3.4 之前，类型扩展发生在对象字面量中：

```typescript
const action = { type: 'INCREMENT' } // has type { type: string }
```

即使我们将 action 声明为 const，仍然可以重新分配 type 属性，因此，该属性被扩展成了字符串类型。如果使用 const assertion 就会锁定 type 的类型为 'INCREMENT'

```typescript
const action = { type: 'INCREMENT' } as const; // has type { type: 'INCREMENT' }
// 或者
// const action = <const>{ type: 'INCREMENT' };
```

const assertion 后，以下代码会报错

```typescript
action.type = 'OTHER';
```

我们看一个实用的例子，[Redux](https://redux.js.org/) 定义 action 示例

```typescript
const setCount = (n: number) => {
  return {
    type: 'SET_COUNT',
    payload: n,
  }
}
const resetCount = () => {
  return {
    type: 'RESET_COUNT',
  }
}
```

我们有个需求，组合所有已定义的 action 类型，

在 TypeScript 3.4 之前，需要为每个 action 声明一个接口或类型

```typescript
interface SetCount {
  type: 'SET_COUNT';
  payload: number;
}

interface ResetCount {
  type: 'RESET_COUNT';
}

const setCount = (n: number): SetCount => {
  return {
    type: 'SET_COUNT',
    payload: n,
  }
}

const resetCount = (): ResetCount => {
  return {
    type: 'RESET_COUNT',
  }
}

type CountActions = SetCount | ResetCount
```

我们创建了两个接口 RESET_COUNT 和 SET_COUNT 来对两个 resetCount 和 setCount 的返回类型进行显示声明。CountActions 是这两个接口的组合。

这会增加编写 Redux action 的负担，现在我们可以通过添加一个 const assertion 来解决这个问题

```typescript
const setCount = (n: number) => {
  return <const>{
    type: 'SET_COUNT',
    payload: n
  }
}

const resetCount = () => {
  return <const>{
    type: 'RESET_COUNT'
  }
}

type CountActions = ReturnType<typeof setCount> | ReturnType<typeof resetCount>;
```

是不是简单了许多

#### 数组字面量成为只读元组

在 TypeScript 3.4 之前，声明一个字面量数组将被扩展并且可以修改。

使用 const assertion 后，数组不能再扩展，而变成了只读元组，如

```typescript
const y = <const>[10, 20]; // Type 'readonly [10, 20]'
// or
const y = [10, 20] as const; // Type 'readonly [10, 20]'
```

以下代码会报错

```typescript
y.push(5);
```

综上所述，使用 ```as const```，会使类型锁定而不能被扩展和修改

参考文档

* [杀手级的TypeScript功能：const断言](https://juejin.cn/post/6844903848939634696)

## 参考资料

* [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)
