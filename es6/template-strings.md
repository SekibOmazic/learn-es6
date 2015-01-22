# Template strings

Template strings introduced in ES6 solve some well known issues such as:

- basic formatting
- multiline strings
- HTML escaping

## Syntax

Template strings are delimited with backticks (`` ` ``):

```Javascript
let str = `Hello ES6`;
console.log(typeof str); // "string"
```

To use backticks in your template string you'll need to escape them:

```Javascript
let msg = `A message with \` inside`
console.log(msg); // A message with ` inside
```

## Multiline

No need for \ anymore:

```Javascript
let multi=`This is
a multiline
string`
```

```Javascript
let template = 
`<div>
  <h1>Chapter 1</h1>
</div>`
console.log(msg);
```

## Interpolation

Real benefit comes with the possibility to replace parts of the template string with expressions put between ${ and }:

```Javascript
let price=1000;
let msg=`This painting costs ${price}€`;
console.log(msg); // This painting costs 1000€
```

You can use any valid expression:

```Javascript
let vat = 19,
    price = 200,
    message = `Total price incl. ${vat}% is ${(price + price*vat/100).toFixed(2)}€`;

console.log(message); // Total price incl. 19% is 238.00€
```

## Tagged template strings

It is possible to modify the output of the template string using a function. That function accepts an array of string literals 
as the first argument and other arguments are the values of the processed expressions. The function must return processed string:

```Javascript
function yoda(strings, ...values) {
  return values[0] + " " +strings[0] + strings[1];
}
let what = 'patience';
console.log(yoda`you must have ${what}my young padawan`)
```

## Raw strings

The first function argument of tagged template strings has a `raw` property which lets you access the raw strings as they were entered:

```Javascript
function tag(strings, ...values) {
  return strings.raw[0];
}
```

You can also use String.raw():

```Javascript
console.log(String.raw`ES6 \nin \nda \nhouse!`); // ES6 \nin \nda \nhouse!
```
