# TypeScript 知识点

## 数据类型

* 原始数据类型分为：boolean number string void null undefined
* 任意值：any
* 联合类型：联合类型使用 | 分隔每个类型，例如：let myFavoriteNumber: string | number;
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
  

## HTMLElement 变量的声明

可以使用关键字 as ，以下是例子

```typescript
const iframe = document.getElementById('circle-window') as HTMLIFrameElement;
const circleBtn = document.getElementById('circleBtn') as HTMLButtonElement;
```

## 参考

[阮一峰 TypeScript 入门教程](https://ts.xcatliu.com/)
