# Generators

Generator is a special function that can be suspended an resumed. 

## Syntax

```Javascript
function* generatorFn() {
  yield 1;
  yield 2;
}
```

* A generator starts in a suspended state
* By invoking next() on the generator, it will execute up until it hits the next yield keyword or returns

```Javascript
var it = generatorFn();
console.log(it.next()); // { value=1, done=false}
console.log(it.next()); // { value=2, done=false}
console.log(it.next()); // { value=undefined, done=true}
```

## Rules

1. The yield keyword must always yield some value (even if its null). When execution resumes, it can optionally receive a value with the use of gen.next(value).
2. The object returned from gen.next() includes a value and a done property. The value property is the currently yielded (or returned) value from the generator. The done property is a Boolean indicating whether or not the generator has run to completion.
3. We can send a value into the generator using gen.next(value). The value replaces then the yield expression as the generator resumes.

```Javascript
  function* greeter () {
    var name = yield 'hello, what is your name?'
    return 'well nice to meet you ' + name
  }
  
  var gen = greeter()

  // Evaluate until first yield, than pause.
  console.log(gen.next().value)  // hello, what is your name?

  // pass a value, replace yield expression with the passed value
  // and evaluate until next yield or return
  console.log(gen.next('Sekib').value) // well nice to meet you Sekib 
```

## Generator test

What is the output here:`

```Javascript
function* testGen(a) {
  var b = 2 * (yield (a * 2));
  var c = yield (b / 4);
  return (a + b + c);
}

var it = testGen(5);

// note: not sending anything into next() here
console.log(it.next());    // { value:10, done:false }
console.log(it.next(6));   // { value:3,  done:false }
console.log(it.next(7));   // { value:24, done:true }
```

## Handling exceptions

You can throw an exception into the generator:

```Javascript
function* gen() {
  yield 1;
  yield 2;
}
var g = gen();

try {
  g.next();
  g.throw('Enough');
} catch(e) {
  console.log(e);
}
```

## Delegating

With ```yield*``` it is possible to delegate the iteration control to another generator.

```Javascript
function* comsysto() {
  yield 'company';
}
function* company() {
  yield 'we are the best';
  yield * comsysto();
  yield 'in the world';
}

for (let i of company()) console.log(i);
```

## What can be done with generators?

- lazy evaluation (task: implement fibonacci)
- infinite sequences (task: implement an infinite id generator)
- make asynchronous code looks synchronous (task: convert callback hell into readable code)

Let's see how to make asynchronous code looks synchronous. Now take a simple wrapper around setTimeout just to simulate asynchronous call:

```Javascript
function delayed(ms, cb, param) {
  setTimeout(() => {
    cb(param);
  }, ms);
}
```
Our generator would look like this:

```Javascript
function * generator() {
  let a = yield delayed(1500, function cb() {});
  let b = yield delayed(1000, function cb() {}, a);
  
  // and so on ...
}
```

Nothing happens here because nobody tells generator to resume. So provided callback `cb()` must know how to push generator forward.
Let's rename this callback to `resume` and pass it in. The `resume` function knows how to forward the generator:

```Javascript```
function * generator(resume) {
  let a = yield delayed(1500, resume);
  let b = yield delayed(1000, resume, a);
  
  // and so on ...
}
```

Now we need some launcher function that takes our generator and runs it. 
This function must also create the `resume` function which takes the value from the last yield and passes it into the generator's `next()` 
so that yielded value can be used as a parameter for the next yield call.

Here is one possible solution:


```Javascript
function run(generatorFunction) {
  let iter;

  function resume(yieldedValue) {
    iter.next(yieldedValue);
  }

  iter = generatorFunction(resume);

  // start
  iter.next();
}
```

or even shorter:

```Javascript
function run(gen) {
  let it = gen(yieldedValue => it.next(yieldedValue));
  it.next();
}
```

## Generators and Promises FTW

Can we use generators with functions that return a promise?
 
```Javascript
function * generator() {
  let resolvedPromise1 = yield asynchFuncThatReturnsPromise();
  let resolvedPromise2 = yield anotherAsynchFuncThatReturnsPromise(resolvedPromise1);
  let resolvedPromise3 = yield yetAnotherAsynchFuncThatReturnsPromise(resolvedPromise2);
  ...
}
```

What would our run() function look like? We'd have to wait for first promise to resolve, 
than pass the result into the second asynch. call, tell generator to move forward and repeat that as long as done != true.
Something like this:

```Javascript
function run(generator) {
  let gen = generator();
  let promise1 = gen.next().value;
  promise1.then(function (resolvedPromise1) {
    let promise2 = gen.next(resolvedPromise1).value;
    promise2.then(function (resolvedPromise2) {
      ...
    });
  });
}
```

We can rewrite this repeating pattern as a recursive function:

```Javascript
function run(generator) {

  var it = generator();
  
  function resume(res) {
    var yielded = it.next(res);
    if (!yielded.done) {
      yielded.value.then(resume);
    }
  }
  resume();
}
```

This works fine, but doesn't handle reject case. And no word about error handling either. 
You could of course write your own library to handle everything, but would you?

So have no fear - task.js is here (or co or Q.spawn, or ...). 
