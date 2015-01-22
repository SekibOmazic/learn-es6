# Arrow Functions

## Simple syntax

```Javascript
// single parameter, single statement, implicit return
param => expression

// single parameter, multiple statements, explicit return
param => {
    expression1;
    expression2;
    [return] expression3;
}

// with zero or many parameter, you need ()
(param1, param2) => { 
  expression 
}

() => expression;
```

Full description [here] (http://wiki.ecmascript.org/doku.php?id=harmony:arrow_function_syntax)

Arrow functions are functions but not newable:

```Javascript
var sum = (x, y) => x + y;

console.log(typeof sum); // function
console.log(sum instanceof Function); // true
console.log(sum.constructor == Function) // true

var instance = new sum(); // TypeError: (x, y) => x + y is not a constructor
```

## Lexical bind to 'this'

Old school

```Javascript
function Counter() {
  var self = this; // reference to this objeect
  this.counter = 0;

  this.interval = setInterval(function () {
    self.counter++; // use reference saved before
    console.log("Value: " + self.counter);
  }, 1000);

  this.stop = function () {
    if (self.interval) clearInterval(self.interval);
  };
}
```

becomes

```Javascript
function Counter() {

  this.counter = 0;

  this.interval = setInterval(() => {
    this.counter ++;
    console.log('Value: ' + this.counter);
  }, 1000);

  this.stop = () => {
    if (this.interval) clearInterval(this.interval)
  }; 
}
```

```Javascript
// run at http://www.es6fiddle.net/
let counter = new Counter();
setTimeout(() => {console.log('calling stop'); counter.stop()}, 5000);
```
