function test2(this: { a: number }) {
  const b = () => {
    console.log(this);
  };
  b();
}
test2.call({ a: 6 }); // 输出this为{a:6}
