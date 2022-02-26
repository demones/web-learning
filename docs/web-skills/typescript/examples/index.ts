function printName(first: string, last: any) {

}

printName('zhang', 'san');

function handleRequest(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
  // 省略实现
}

const req = {
  url: 'https://example.com',
  method: 'GET',
} as const;

handleRequest(req.url, req.method);

// const assertions
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

setCount(32);

const action = { type: 'INCREMENT' } as const;

// 以下代码会报错
// action.type = 'OTHER';

const action2 = <const>{ type: 'INCREMENT' };

const y = <const>[10, 20]; // Type 'readonly [10, 20]'

// 以下代码会报错
// y.push(5);

function test(a: string[]) {}

const b: string[] = [];

test({...b});
