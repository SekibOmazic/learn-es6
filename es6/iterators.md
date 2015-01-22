# Iterators

## Iterator protocol

An iterator is an object with a next method that returns { done, value } tuples.

### Implementing an iterator

```Javascript
function makeIterator(collection) {
  let index = 0;
  
  return {
    next: function () {
      let done  = index < collection.length ? false: true;
      let value = !done ? collection[index++] : undefined;
      
      return { done: done, value value };
    }
  }
}
```

## Iterable protocol

An iterable is an object which has an internal method, written in the current ES6 draft specs as `obj[@@iterator]()`, that returns an iterator.
This means that an object must have a property with Symbol.iterator key.

```Javascript
function makeIterable(collection) {
  let index = 0;

  // new ES6 syntax - no function keyword needed
  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      // see above
    }
  }
}
```

## Built-in Iterators

- entries() - returns an iterator whose values are a key-value pair.
- values() - returns an iterator whose values are the values of the collection.
- keys() - returns an iterator whose values are the keys contained in the collection.

Objects with built-in iterators: Map, Set, Array, TypedArray, string 


## for-of Loop

There is for-in already, so why new loop? For-in has some limitation:

```Javascript
var arr = ['me', 'myself', 'I'];
for (var el in arr) console.log(el); // 0, 1, 2

var company = {
  name: 'comSysto',
  city: 'Munich',
  employees: 60,
};

for (var el in company) console.log(el); // name, city, employees
```

for-of works with iterables!

You can make your own and put it into for-of:

```Javascript
let family = ['Sekib', 'Almira', 'Alan', 'Arian']

for (let member of makeIterable(family)) 
  console.log(member);
```

or use built-in:

```Javascript
for (let [index, value] of family.entries()) 
  console.log(index, value);
```

