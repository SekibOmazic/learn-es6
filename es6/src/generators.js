export function delay(time, callback) {
  setTimeout(function () {
    callback('Invoking callback after ' + time + ' ms');
  }, time);
}

export function delayed(ms, cb, param) {
  setTimeout(() => {
    cb(param);
  }, ms);

  //setTimeout(cb, ms, param);
}

export function runGenerator(generatorFunction) {
  var generatorItr = generatorFunction(resume);

  function resume(yieldedValue) {
    generatorItr.next(yieldedValue);
  }

  generatorItr.next()
}

export function synch(generator) {
  var it = generator(param => it.next(param));
  it.next();
}


export function asynchMethodReturningPromise(ms, param) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, ms, param);
  });
}

export function runPromises(generator) {

  var it = generator();

  function resume(res) {
    var yielded = it.next(res);
    if (!yielded.done) {
      yielded.value.then(resume);
    }
  }

  resume();
}


export function* endlessCounter() {
  for (var i=0; true; i++) {
    var reset = yield i;

    if (reset) { i = -1; }
  }
}




export function* fibGen() {
  let a = 0, b = 1;

  while(true) {
    yield a;
    [a, b] = [b, a + b];
  }

}


export function* greet () {
  let v = yield 'Hello';
  yield v + ' world';
}


export function *totalPrice(price, vat) {
  yield (price + (price * vat)/100);
}

export function *totalPriceGenerator(price) {
  let vat = yield 19;

  yield *totalPrice(price, vat);
}


// EXAMPLES
function* fibonacci2() {
  let [a, b] = [0, 1];

  while(true) {
    [a, b] = [b, a + b];
    yield b;
  }

}

