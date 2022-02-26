(function(){
  /**
   * extends
   * 语法：T extends K
   * 这里的 extends不是类，接口继承的意思，而是起到限定与约束作用，意思是 判断 T 能否赋值给 K
   * 有时候定义的泛型类型不想什么类型都可以，想继承某些类，可以通过 extends关键字添加泛型约束。
   * @param target
   * @param source
   * @returns
   */
  const useCopyKeys = <T extends U, U>(target: T, source: U) => {
    for (let key in source) {
      target[key] = (source as T)[key];
    }
    return target;
  };

  const obj = { a: 1, b: 2, c: 3, d: 4 };
  useCopyKeys(obj, { b: 10, c: 20 });

  console.log(obj);

  /**
   * Exclude工具类型
   * type Exclude<T, U> = T extends U ? never : T;
   * 以下代码会被分发为 string extends number ? never : string | number extends number ? never : number，因此得到string。
   */
  type E0= Exclude<string | number, number>; // string

  const str: E0 = '3333';

  const num: E0 = 444; // 不能将类型“number”分配给类型“string”。

  console.log(str, num);

  /**
   *
    type Record<K extends keyof any, T> = {
        [P in K]: T;
    };
   */
  const list: Record<number, string> = ['44', '55'];

  interface Customer {
    name: string;
    age: number;
  }

  type Result = Record<number, Customer>; // type Result = { [x: number]: Customer; }

  const varible: Result = [{ name: 'jac', age: 111 }]; // OK

  type Result2 = Record<string, Customer>; // type Result = { [x: string]: Customer; }

  const varible2: Result2 = [{ name: 'jac', age: 111 }]; // Error

  const varible3: Result2 = { info: { name: 'jac', age: 111 } }; // OK

  // 类型守卫，将 value 的类型缩小为 Error
  const isError = (value: any): value is Error => value?.message;

  const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
      return error?.message;
    }
    return null;
  }

})();