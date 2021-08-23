# TypeScript 知识点

## 数据类型

typescript中 数据类型：布尔(boolean)、数字(number)、字符串(string)、Symbol(Symbol)、数组([] Array)、元组(tuple)、枚举(enum)、any、unknown、void、null、undefined、never、object

* 原始数据类型分为：boolean number string void null undefined Symbol

* 元组：tuple，指固定的类型

  ```typescript
    let person1: [number, string] = [1, 'abc'];

    // 报错
    person1 = [1, 2];
  ```

* 联合类型：联合类型使用 | 分隔每个类型，例如：let myFavoriteNumber: string | number;
  联合类型还可以指定特定的值，称为字面量类型 literal，声明后赋值只能是指定的字面量值

  ```typescript
    let literal1: 1 | 'abc' | true | [1, 2, 3, 4];

    literal1 = 1;

    // 报错
    literal1 = 2;
  ```

* 枚举类型：enum

  ```typescript
    enum Color {
      red,
      green,
      blue
    };

    const color1 = Color.green;

    console.info(color1); // 输出 1
    console.info(Color[0]); // 输出 red

    enum Color2 {
      red = 5,
      green = 'green',
      blue = 2
    };

    const color2 = Color2.green;

    console.info(color2); // 输出 green
  ```

  枚举类型默认会编译成js对应的键值，如果只是为了标识其对应类型，可以用常量枚举，举例说明

  ```typescript
    const enum Direction {
      NORTH,
      SOUTH,
      EAST,
      WEST,
    }

    let dir: Direction = Direction.NORTH;
  ```

  以上代码对应的 ES5 代码如下：

  ```javascript
    "use strict";
    var dir = 0 /* NORTH */;
  ```

  枚举中类型不一致的情况被称为异构枚举，如：异构枚举的成员值是数字和字符串的混合

  ```typescript
    enum Enum {
      A,
      B,
      C = "C",
      D = "D",
      E = 8,
      F,
    }
  ```

  以上代码对于的 ES5 代码如下：

  ```javascript
    "use strict";
    var Enum;
    (function (Enum) {
        Enum[Enum["A"] = 0] = "A";
        Enum[Enum["B"] = 1] = "B";
        Enum["C"] = "C";
        Enum["D"] = "D";
        Enum[Enum["E"] = 8] = "E";
        Enum[Enum["F"] = 9] = "F";
    })(Enum || (Enum = {}));
  ```

  通过观察上述生成的 ES5 代码，我们可以发现数字枚举相对字符串枚举多了 “反向映射”：

  ```javascript
    console.log(Enum.A) // 输出：0
    console.log(Enum[0]) // 输出：A
  ```

* any 和 unknown 用法与区别

  * any 指任意类型，声明any后，typescript不会检测其类型，也不保证类型安全
  * unknown 未知类型，不会检测其类型，但可以保证类型安全，编译时会检测类型是否合法
  * 以下给出两个例子，做对比说明，通过例子可一目了然其不同

    ```typescript
      let randomValue: any;
      randomValue = 666;
      randomValue = '333';
      randomValue = true;
      // 编译不会报错，但运行会报错
      randomValue();
      randomValue.toUpperCase();
    ```

    ```typescript
      let randomValue: unknown;
      randomValue = 666;
      randomValue = '333';
      randomValue = true;

      // 如果不加类型检测，会给出错误提示
      if (typeof randomValue === 'function') {
        randomValue();
      }

      // 如果不加类型检测，会给出错误提示
      if (typeof randomValue === 'string') {
        randomValue.toUpperCase();
      }
    ```

* void undefined 和 never 用在函数上的不同
  * void 指返回值不存在，如果不指定函数类型，默认为 void
  * undefined 指返回值为 undefined
  * never 指函数无法执行完，一般用在抛出异常或多分支情况下

  ```typescript
    function fun(): void {
      console.info('typescript');
    }

    function fun2(): undefined {
      console.info('typescript');
      return;
    }

    // 无法执行到函数最后，指定never，除了抛出异常，死循环也可以是never类型
    function throwError(message: string, errorCode: number): never {
      throw {
        message,
        errorCode
      }
    }

    throwError('error', 404);
  ```

* 类型适配
  类型适配有两种方式：泛型<> 和 as

  ```typescript
    let message: any;
    message = 'message';

    (<string>message).endWith('e');

    // jsx中必须用这种
    (message as string).endWith('e');
  ```

* 对象类型：一个对象类型需要提前定义一个接口
  * 例子

  ```typescript
    interface Person {
      name: string;
      age: number;
    }

    let tom: Person = {
      name: 'Tom',
      age: 25
    };
  ```

  注意：定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的

  * 可选属性

  ```typescript
    interface Person {
      name: string;
      age?: number;
    }

    let tom: Person = {
      name: 'Tom'
    };

    let linder: Person = {
      name: 'Linder',
      age: 25
    };
  ```

  * 任意属性

  ```typescript
    interface Person {
        name: string;
        age?: number;
        [propName: string]: any;
    }

    let tom: Person = {
        name: 'Tom',
        gender: 'male'
    };
  ```

  需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集

  ```typescript
    interface Person {
        name: string;
        age?: number;
        [propName: string]: string;
    }

    let tom: Person = {
        name: 'Tom',
        age: 25,
        gender: 'male'
    };

  // Initializer type {gender: string, name: string, age: number} is not assignable to variable type Person
  ```

  上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。

  * 只读属性

  ```typescript
    interface Person {
        readonly id: number;
        name: string;
        age?: number;
        [propName: string]: any;
    }

    let tom: Person = {
        id: 89757, // 此处不会报错，并且必须给只读属性赋值
        name: 'Tom',
        gender: 'male'
    };
    // Attempt to assign to const or readonly variable
    tom.id = 9527;
  ```

  注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候

* 数组类型
  在 TypeScript 中，数组类型有多种定义方式，比较灵活。
  * 「类型 + 方括号」表示法

  ```typescript
    let fibonacci: number[] = [1, 1, 2, 3, 5];
  ```

  数组的项中不允许出现其他的类型；数组的一些方法的参数也会根据数组在定义时约定的类型进行限制

  ```typescript
    // Type 'string' is not assignable to type 'number'.
    let fibonacci: number[] = [1, '1', 2, 3, 5];
    // Argument of type '"8"' is not assignable to parameter of type 'number'.
    fibonacci.push('8');
  ```

  * 数组泛型表示法
  我们也可以使用数组泛型（Array Generic） Array<elemType> 来表示数组：

  ```typescript
    let fibonacci: Array<number> = [1, 1, 2, 3, 5];
  ```

  * 用接口表示数组

  ```typescript
    interface NumberArray {
        [index: number]: number;
    }
    let fibonacci: NumberArray = [1, 1, 2, 3, 5];
  ```

  * 类数组

  ```typescript
   function sum() {
     let args: {
       [index: number]: number;
       length: number;
       callee: Function;
     } = arguments;
   }
  ```

  * any 在数组中的应用
  一个比较常见的做法是，用 any 表示数组中允许出现任意类型

  ```typescript
    let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
  ```

* 自定义类型

  ```typescript
    function isFish(pet: Fish | Bird): pet is Fish {
        return (<Fish>pet).swim !== undefined;
    }
  ```

  is 关键字用来声明自定义类型

* 类型别名

  类型别名用来给一个类型起个新名字。

  ```typescript
    type Message = string | string[];

    let greet = (message: Message) => {
      // ...
    };
  ```

## TypeScript 断言

TypeScript 断言包含类型断言（使用as或尖括号）、非空断言(使用后缀表达式!)、 确定赋值断言(在实例属性和变量声明后面放置一个 !)

* 类型断言

  ```typescript
    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length;
  ```

  ```typescript
    let someValue: any = "this is a string";
    let strLength: number = (someValue as string).length;
  ```

* 非空断言

  1. 忽略 undefined 和 null 类型

    ```typescript
      function myFunc(maybeString: string | undefined | null) {
        // Type 'string | null | undefined' is not assignable to type 'string'.
        // Type 'undefined' is not assignable to type 'string'.
        const onlyString: string = maybeString; // Error
        const ignoreUndefinedAndNull: string = maybeString!; // Ok
      }
    ```

  1. 调用函数时忽略 undefined 类型

    ```typescript
      type NumGenerator = () => number;

      function myFunc(numGenerator: NumGenerator | undefined) {
        // Object is possibly 'undefined'.(2532)
        // Cannot invoke an object which is possibly 'undefined'.(2722)
        const num1 = numGenerator(); // Error
        const num2 = numGenerator!(); //OK
      }
    ```

* 确定赋值断言
在 TypeScript 2.7 版本中引入了确定赋值断言，即允许在实例属性和变量声明后面放置一个 ! 号，从而告诉 TypeScript 该属性会被明确地赋值。为了更好地理解它的作用，我们来看个具体的例子：

```typescript
  let x: number;
  initialize();
  // Variable 'x' is used before being assigned.(2454)
  console.log(2 * x); // Error

  function initialize() {
    x = 10;
  }
```

很明显该异常信息是说变量 x 在赋值前被使用了，要解决该问题，我们可以使用确定赋值断言

```typescript
  let x!: number;
  initialize();
  console.log(2 * x); // Ok

  function initialize() {
    x = 10;
  }
```

通过 let x!: number; 确定赋值断言，TypeScript 编译器就会知道该属性会被明确地赋值。

## 类型守卫

类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。 换句话说，类型保护可以保证一个字符串是一个字符串，尽管它的值也可以是一个数值。类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。目前主要有四种的方式来实现类型保护：

1. in 关键字

  ```typescript
  interface Admin {
    name: string;
    privileges: string[];
  }

  interface Employee {
    name: string;
    startDate: Date;
  }

  type UnknownEmployee = Employee | Admin;

  function printEmployeeInformation(emp: UnknownEmployee) {
    console.log("Name: " + emp.name);
    if ("privileges" in emp) {
      console.log("Privileges: " + emp.privileges);
    }
    if ("startDate" in emp) {
      console.log("Start Date: " + emp.startDate);
    }
  }
  ```

1. typeof 关键字

  ```typescript
  function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
  }
  ```

  typeof 类型保护只支持两种形式：typeof v === "typename" 和 typeof v !== typename，"typename" 必须是 "number"， "string"， "boolean" 或 "symbol"。 但是 TypeScript 并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。

1. instanceof 关键字

  ```typescript
  interface Padder {
    getPaddingString(): string;
  }

  class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) {}
    getPaddingString() {
      return Array(this.numSpaces + 1).join(" ");
    }
  }

  class StringPadder implements Padder {
    constructor(private value: string) {}
    getPaddingString() {
      return this.value;
    }
  }

  let padder: Padder = new SpaceRepeatingPadder(6);

  if (padder instanceof SpaceRepeatingPadder) {
    // padder的类型收窄为 'SpaceRepeatingPadder'
  }
  ```

1. 自定义类型保护的类型谓词

  ```typescript
  function isNumber(x: any): x is number {
    return typeof x === "number";
  }

  function isString(x: any): x is string {
    return typeof x === "string";
  }
  ```

## 交叉类型

在 TypeScript 中交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

```typescript
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

let point: Point = {
  x: 1,
  y: 1
}
```

在上面代码中我们先定义了 PartialPointX 类型，接着使用 & 运算符创建一个新的 Point 类型，表示一个含有 x 和 y 坐标的点，然后定义了一个 Point 类型的变量并初始化。

1. 同名基础类型属性的合并

    那么现在问题来了，假设在合并多个类型的过程中，刚好出现某些类型存在相同的成员，但对应的类型又不一致，比如：

    ```typescript
      interface X {
        c: string;
        d: string;
      }

      interface Y {
        c: number;
        e: string
      }

      type XY = X & Y;
      type YX = Y & X;

      let p: XY;
      let q: YX;
    ```

    在上面的代码中，接口 X  和接口 Y 都含有一个相同的成员 c，但它们的类型不一致。对于这种情况，此时 XY 类型或 YX 类型中成员 c 的类型是不是可以是 string 或 number 类型呢？比如下面的例子：

    ```typescript
      p = { c: 6, d: "d", e: "e" };
    ```

    ![交叉类型](./images/1.image)

    ```typescript
      q = { c: "c", d: "d", e: "e" };
    ```

    ![交叉类型](./images/2.image)

    为什么接口 X 和接口 Y 混入后，成员 c 的类型会变成 never 呢？这是因为混入后成员 c 的类型为 string & number，即成员 c 的类型既可以是 string 类型又可以是 number 类型。很明显这种类型是不存在的，所以混入后成员 c 的类型为 never。

1. 同名非基础类型属性的合并

    在上面示例中，刚好接口 X 和接口 Y 中内部成员 c 的类型都是基本数据类型，那么如果是非基本数据类型的话，又会是什么情形。我们来看个具体的例子：

    ```typescript
      interface D { d: boolean; }
      interface E { e: string; }
      interface F { f: number; }

      interface A { x: D; }
      interface B { x: E; }
      interface C { x: F; }

      type ABC = A & B & C;

      let abc: ABC = {
        x: {
          d: true,
          e: 'semlinker',
          f: 666
        }
      };

      console.log('abc:', abc);
    ```

    以上代码成功运行后，控制台会输出以下结果：

    ![交叉类型](./images/3.image)

    由上图可知，在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并。

## 声明文件

这篇文章写得很详细：<https://ts.xcatliu.com/basics/declaration-files.html>

## ECMAScript 私有字段

在 TypeScript 3.8 版本就开始支持ECMAScript 私有字段，使用方式如下：

```typescript
  class Person {
    #name: string;

    constructor(name: string) {
      this.#name = name;
    }

    greet() {
      console.log(`Hello, my name is ${this.#name}!`);
    }
  }

  let semlinker = new Person("Semlinker");

  semlinker.#name;
  //     ~~~~~
  // Property '#name' is not accessible outside class 'Person'
  // because it has a private identifier.
```

与常规属性（甚至使用 private 修饰符声明的属性）不同，私有字段要牢记以下规则：

* 私有字段以 # 字符开头，有时我们称之为私有名称；
* 每个私有字段名称都唯一地限定于其包含的类；
* 不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；
* 私有字段不能在包含的类之外访问，甚至不能被检测到。

## typescript 内置函数

### Record 声明JSON对象

```typescript
const infos: Record<string, string | number> = {
  a: 1,
  b: '2',
  c: true, // error
}
```

```typescript
const obj = {
  name: 'Niko',
  age: 18,
  birthday: new Date()
}

const infos: Record<keyof typeof obj, string> = {
  name: '',
  age: '',
  birthday: 123, // 出错，提示类型不匹配
  test: '', // 提示不是`info`的已知类型
}
```

### 获取函数的返回值类型 ReturnType

```typescript
function func () {
  return {
    name: 'Niko',
    age: 18
  }
}

type results = ReturnType<typeof func>

// 或者也可以拼接 keyof 获取所有的 key
type resultKeys = keyof ReturnType<typeof func>

// 亦或者可以放在`Object`中作为动态的`key`存在
type infoJson = Record<keyof ReturnType<typeof func>, string>

```

## tsconfig

执行以下代码会生成tsconfig.json 文件

```shell
  tsc --init
```

官方地址：<https://www.typescriptlang.org/zh/tsconfig>

共有六个根配置属性：files、extends、include、exclude、references、compilerOptions、watchOptions 和 typeAcquisition

### files 指定要编译的文件列表，对于文件少且文件数固定的项目，可以使用该配置项设置要编译的ts文件，一般不会使用files，而是使用功能更强大的 include

  ```json
    {
      "compilerOptions": {},
      "files": [
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "tsc.ts"
      ]
    }
  ```

### extends 指继承一个基本的配置项

  参见：<https://www.typescriptlang.org/zh/tsconfig#extends>

### Include 指定包含的ts文件，可以使用通配符，例如

```json
  {
    "include": ["src/**/*", "tests/**/*"]
  }
```

### Exclude 指定排除的ts文件，可以使用通配符，例如

```json
  {
    "exclude": ["node_modules"]
  }
```

### References

详细看官方说明：<https://www.typescriptlang.org/docs/handbook/project-references.html>

### compilerOptions

编译选项包括：项目选项、严格模式、模块解析、Source Maps、额外检查、实验选项、高级和命令行

* 项目选项：allowJs,checkJs,composite,declaration,declarationMap,downlevelIteration,importHelpers,incremental,isolatedModules,jsx,lib,module,noEmit,outDir,outFile,plugins,removeComments,rootDir,sourceMap,target and tsBuildInfoFile
* 严格模式：alwaysStrict,noImplicitAny,noImplicitThis,strict,strictBindCallApply,strictFunctionTypes,strictNullChecks andstrictPropertyInitialization
* 模块解析：allowSyntheticDefaultImports,allowUmdGlobalAccess,baseUrl,esModuleInterop,moduleResolution,paths,preserveSymlinks,rootDirs,typeRoots,types
* Source Maps：inlineSourceMap,inlineSources,mapRoot and sourceRoot
* 额外检查：noFallthroughCasesInSwitch,noImplicitOverride,noImplicitReturns,noPropertyAccessFromIndexSignature,noUncheckedIndexedAccess,noUnusedLocals and noUnusedParameters
* 实验选项：emitDecoratorMetadata andexperimentalDecorators
* 高级：allowUnreachableCode,allowUnusedLabels,assumeChangesOnlyAffectDirectDependencies,charset,declarationDir,diagnostics,disableReferencedProjectLoad,disableSizeLimit,disableSolutionSearching,disableSourceOfProjectReferenceRedirect,emitBOM,emitDeclarationOnly,explainFiles,extendedDiagnostics,forceConsistentCasingInFileNames,generateCpuProfile,importsNotUsedAsValues,jsxFactory,jsxFragmentFactory,jsxImportSource,keyofStringsOnly,listEmittedFiles,listFiles,maxNodeModuleJsDepth,newLine,noEmitHelpers,noEmitOnError,noErrorTruncation,noImplicitUseStrict,noLib,noResolve,noStrictGenericChecks,out,preserveConstEnums,reactNamespace,resolveJsonModule,skipDefaultLibCheck,skipLibCheck,stripInternal,suppressExcessPropertyErrors,suppressImplicitAnyIndexErrors,traceResolution anduseDefineForClassFields
* 命令行参数：preserveWatchOutput andpretty

#### 项目选项

* allowJs 默认 false，是否允许引入后缀是js的文件
* checkJs 默认 false，是否检测js文件语法
* composite 默认 false，开启后，会强制执行某些约束，详情看官方说明：<https://www.typescriptlang.org/zh/tsconfig#composite>
* declaration 默认 false，开启后，为你工程中的每个 TypeScript 或 JavaScript 文件生成 .d.ts 文件
* declarationMap 默认 false，开启后，为你工程中的每个 TypeScript 文件生成 .d.ts source map 文件
* downlevelIteration 默认 false，迭代器降级时，更准确的模拟es6行为
* importHelpers 默认 false，导入辅助，如果启用了 importHelpers 选项，这些辅助函数将从 tslib 中被导入
* incremental true if composite, false otherwise，使 TypeScript 将上次编译的工程图信息保存到磁盘上的文件中。这将会在您编译输出的同一文件夹中创建一系列 .tsbuildinfo 文件，TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
* isolatedModules 默认 false，孤立模块
* jsx 指定jsx输出方式
* lib 设置库文件，TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
* module 设置模块格式，主要有以下几种方式：CommonJS、ES6、UMD、AMD等
* noEmit 默认 false 禁止编译器生成文件
* outDir 输出目录
* outFile 输出文件，如果被指定，所有 全局 （非模块） 文件将被合并到指定的单个输出文件中，注：除非 module 是 None，System 或 AMD， 否则不能使用 outFile。 这个选项 不能 用来打包 CommonJS 或 ES6 模块。
* plugins 指定插件列表
* removeComments 默认 false，编译后是否删除注释
* rootDir 根目录
* sourceMap 默认 false，是否生成 sourceMap
* target 编译目标，默认 ES3
* tsBuildInfoFile 默认 .tsbuildinfo，这个选项可以让您指定一个文件来存储增量编译信息，以作为复合工程的一部分，从而可以更快的构建更大的 TypeScript 代码库。增量编译文件的存储位置

#### 严格模式

* alwaysStrict 默认true，即编译后插入 "use strict"
* noImplicitAny 默认true，any 是否隐式处理，如果没有指定具体的类型，ts会回退到 any 类型
* noImplicitThis 默认true，
* strict 默认true，开启所有严格的类型检查
* strictBindCallApply 默认true，检测 call bind 和 apply 传入的参数是否与声明的类型一致
* strictFunctionTypes 默认true，检测函数参数类型是否与声明的类型一致
* strictNullChecks 默认true，是否空检测
* strictPropertyInitialization 默认true，属性是否初始化检测

### 模块解析

* allowSyntheticDefaultImports 是否允许合成默认导入
* allowUmdGlobalAccess 默认false，是否允许 Umd 全局访问
* baseUrl 基准目录
* esModuleInterop ES 模块，是否有 default
* moduleResolution 指定模块解析策略，使用 'node'即可
* paths 一些模块path 路径设置
* preserveSymlinks 解析路径预处理，启用后，对于模块和包的引用（例如 import 和 /// <reference type="..." /> 指令都相对于符号链接所在的位置进行解析，而不是相对于符号链接解析后的路径。
* rootDirs 设置多个根目录
* typeRoots 默认 @types 包都将包含在你的编译过程中，可以通过typeRoots设置仅参与编译的目录类型，比如："typeRoots": ["./typings", "./vendor/types"]
* types  默认 @types 包都将包含在你的编译过程中，可以通过typeRoots设置仅参与编译的 @types，比如 "types": ["node", "jest", "express"]

### Source Maps

* inlineSourceMap 默认 false， 开启后会在编译后的js文件中生成 Source Maps
* inlineSources
* mapRoot
* sourceRoot

### 额外检查

* noFallthroughCasesInSwitch 默认false switch语句 case没有 break 和 return 报错
* noImplicitOverride 默认 false，检测继承类时需要覆盖方法
* noImplicitReturns 默认 false，检测每个分支返回值是否统一
* noPropertyAccessFromIndexSignature 默认 false
* noUncheckedIndexedAccess
* noUnusedLocals 默认 false，是否允许有没有使用的变量
* noUnusedParameters 默认 false，是否允许有没有使用的参数

### 实验选项

* emitDecoratorMetadata
* experimentalDecorators

### 高级

* allowUnreachableCode 永远不会执行到的代码，如何处理
* allowUnusedLabels 是否允许 label
* assumeChangesOnlyAffectDirectDependencies
* charset
* declarationDir 指定生成声明文件存放目录
* diagnostics 打印诊断信息
* disableReferencedProjectLoad
* disableSizeLimit
* disableSolutionSearching
* disableSourceOfProjectReferenceRedirect
* emitBOM
* emitDeclarationOnly 只生成声明文件，而不会生成js文件
* explainFiles
* extendedDiagnostics
* forceConsistentCasingInFileNames
* generateCpuProfile
* importsNotUsedAsValues
* jsxFactory
* jsxFragmentFactory
* jsxImportSource
* keyofStringsOnly
* listEmittedFiles
* listFiles
* maxNodeModuleJsDepth
* newLine
* noEmitHelpers 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
* noEmitOnError 报错是否终止编译，默认false，设为true终止编译
* noErrorTruncation
* noImplicitUseStrict
* noLib
* noResolve
* noStrictGenericChecks
* out
* preserveConstEnums
* reactNamespace
* resolveJsonModule
* skipDefaultLibCheck
* skipLibCheck
* stripInternal
* suppressExcessPropertyErrors
* suppressImplicitAnyIndexErrors
* traceResolution
* useDefineForClassFields

## HTMLElement 变量的声明

可以使用关键字 as ，以下是例子

```typescript
const iframe = document.getElementById('circle-window') as HTMLIFrameElement;
const circleBtn = document.getElementById('circleBtn') as HTMLButtonElement;
```

## 开发辅助工具

* 实时查看 ts 编译结果，可使用官方提供的在线编译器，<https://www.typescriptlang.org/zh/play>
* json文件转换为ts，<http://json2ts.com/>
* [一款在线 TypeScript UML 工具](https://tsuml-demo.firebaseapp.com/)
* [TypeDoc](https://typedoc.org/)

## 参考

* [阮一峰 TypeScript 入门教程](https://ts.xcatliu.com/)
* [2小时极速入门 TypeScript](https://www.imooc.com/learn/1306)
* <https://www.tslang.cn/docs/handbook/basic-types.html>
* [一份不可多得的 TS 学习指南](https://juejin.cn/post/6872111128135073806)
* [学习资料](https://github.com/semlinker/awesome-typescript)
