# Destructuring

Destructuring is a Javascript syntax that lets you extract data from an object or an array and 
use that data to create a new array, object, variable, etc.

## Array pattern

```Javascript
var [x,y] = ['Hello', 'ES6'];
console.log(x); // 'Hello'
console.log(y); // 'ES6'
```

Swapping variables looks better:

```Javascript
let x = 'Hello', y = 'World';
[x ,y] = [y, x];
console.log(x); // 'ES6'
console.log(y); // 'Hello'
```

And if you only care about some values:

```Javascript
let [a, , , b ] = ['Value', 'I', 'am', 'interested', 'in'];
console.log(a, b); // Value interested 
```

## Object pattern

Works by matching object properties instead of array indices. Allows you to take only those you are interested in and ignore the rest:

```Javascript
function employeeOfTheMonth() {
    return { firstName: 'Sekib', title: 'Chief Relaxing Officer', company: 'comSysto' }
}

// Yo can assign new variable names
let { firstName: name, title: job } = employeeOfTheMonth();

console.log(job); // 'Chief Relaxing Officer'
```

It also works with default parameters passed to a function:

```Javascript
function ajax({url= '/user', method= 'GET'} = {}) {
  console.log(url, method);
}

ajax({method: 'POST'});  //   /user POST
```
