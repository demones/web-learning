function firstElement<T> (arr: T[], index: number): T | undefined {
  return arr[index];
}

function map<Input, Output> (arr: Input[], fn: (item: Input) => Output): Output[] {
  return arr.map(fn);
}