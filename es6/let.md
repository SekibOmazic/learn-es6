# Let

let allows you to declare variables, limiting its scope to the block, statement, or expression on which it is used:

```Javascript
function letTest() {
  let x = 31;
  if (true) {
    let x = 71;  // different variable
    let y = 'A';
    console.log(x, y);  // 71 'A'
  }
  // y is not defined here
  console.log(x);  // 31
}
```

Example taken from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)