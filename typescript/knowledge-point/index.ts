let person: [number, string] = [1, 'dd'];

person.push(4);

console.info(person);

// 元组 tiuple类型
let person1: [number, string] = [1, 'abc'];

// person1 = [1, 2];

let literal1: 1 | 'abc' | true | [1, 2, 3, 4];

literal1 = 1;

// 报错
// literal1 = 2;

enum Color {
  red,
  green,
  blue
};

const color1 = Color.green;

enum Color2 {
  red = 5,
  green = 'green',
  blue = 2
};

const color2 = Color2.green;

let randomValue: unknown;
randomValue = 666;
randomValue = '333';
randomValue = true;

if (typeof randomValue === 'function') {
  randomValue();
}

if (typeof randomValue === 'string') {
  randomValue.toUpperCase();
}

function fun(): void {
  console.info('typescript');
}

function fun2(): undefined {
  console.info('typescript');
  return;
}

function throwError(message: string, errorCode: number): never {
  throw {
    message,
    errorCode
  }
}

throwError('error', 404);

interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}