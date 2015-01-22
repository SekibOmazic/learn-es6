# Rest parameters

This syntax allows you to pass an indefinite (don't exaggerate) number of arguments as an array in your function.

Before we had something like this:

```Javascript
function squares() {
  var result = [];
  for (var i = 0; i< arguments.length; i++) {
    result.push(arguments[i]);
  }

  return result;
}
console.log(squares(1, 2, 3)); // 1, 4, 9
```

One had to use `arguments` which is not a real array. 

With ES6 we can do it like this:

```Javascript
function squares(...numbers) {
  return numbers.map((num) => num*num);
}
console.log(squares(1, 2, 3)); // 1, 4, 9
```
It's safe not to pass rest parameter at all - it will be converted to an empty array.


Important: the rest parameter is always the last parameter in the function!


# Spread operator

Spread operator expands an array into individual parameters.

```Javascript
function sum(a, b, c) {
  return a + b + c;
}

// use with parameters
sum(1,2,3);

// use with an array of parameters (ES5 style)
sum.apply(null, [1,2,3]);

// use with an array of parameters (ES6 style)
sum(...[1,2,3]);
```

Can be used with arrays:

```Javascript
let letters = ['a', 'b', 'c'];
let arr = [...letters, 1, 2, 3];
console.log(arr); // a,b,c,1,2,3
```
