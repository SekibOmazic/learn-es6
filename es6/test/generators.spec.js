import { 
  fibGen, 
  greet, 
  totalPriceGenerator, 
  delay, 
  delayed, 
  runGenerator, 
  synch, 
  runPromises, 
  asynchMethodReturningPromise, 
  endlessCounter
} from '../src/generators.js';

import { getJsonWithPromises } from '../src/promises.js';


describe('ES6 generators', function () {

  beforeEach(function() {
//    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  });


  it('should count and be able to reset the counter', () => {
    let tg = endlessCounter();

    tg.next();

    expect(tg.next().value).toBe(1);
    expect(tg.next().value).toBe(2);
    expect(tg.next().value).toBe(3);
    expect(tg.next(true).value).toBe(0);
  });


  it('should generate fibonacci numbers', () => {
    let fibonacci = fibGen();
    
    expect(fibonacci.next().value).toBe(0);
    expect(fibonacci.next().value).toBe(1);
    expect(fibonacci.next().value).toBe(1);
    expect(fibonacci.next().value).toBe(2);
    expect(fibonacci.next().value).toBe(3);
    expect(fibonacci.next().value).toBe(5);
    expect(fibonacci.next().value).toBe(8);
  });


  it('should pass a value into generator', () => {
    let greeter = greet();
    
    expect(greeter.next().value).toEqual('Hello');
    
    expect(greeter.next('my').value).toEqual('my world');
  });


  it('should call delay', function() {
    delay(1000, param => {
      console.log(param);
      
      delay(2000, p2 => {
        console.log(p2) 
      });

    });

    jasmine.clock().tick(3001);
  });


  it('should delegate to next generator', () => {
    let price = totalPriceGenerator(100);
    
    let vat = price.next().value;
    expect(vat).toBe(19);

    let total = price.next(vat);
    
    expect(total.value).toBe(119);
    
  });


  it('should call asynchronous method in generator', () => {

    let first, second;
    
    runGenerator(function* generatorFn(resume) {
      first  = yield delayed(500, resume, 'Hello');
      second = yield delayed(100, resume, 'Sekib');

      expect(first).toEqual('Hello');
      expect(second).toEqual('Sekib');
    });

    jasmine.clock().tick(701);
  });


  it('should call setTimeout in generator', () => {

    let result;

    synch(function* generatorFn(resume) {
      result =  yield setTimeout(() => resume('hello'), 500);
      result += yield setTimeout(() => resume(' world'), 1200);
    });

    jasmine.clock().tick(2001);

    expect(result).toBe('hello world');
  });

  
  it('should run multiple asynch methods each returning a promise', () => {
    let a, b, c;

    runPromises(function *() {
      a = yield asynchMethodReturningPromise(500, 'Generators');
      b = yield asynchMethodReturningPromise(200, 'Promises');
      c = yield asynchMethodReturningPromise(100, 'FTW');

      console.log("A;B;C", a, b, c);
      // hacky solution? Don't like it
      expect(a).toBeDefined();
      expect([a,b,c].join('-')).toEqual('Generators-Promises-FTW');
    });

  });

  
  it('should synchronously read files', () => {

    runPromises(function *() {
      let user = yield getJsonWithPromises('assets/profile.json?id=1234');
      let category = yield getJsonWithPromises('assets/category.json?userId=' + user.id);
      let item = yield getJsonWithPromises('assets/item'+category.items[0].id+'.json');

      console.log("ITEM", item);
      expect(item.name).toEqual("JavaScript for Dummies");
    });

  });

});