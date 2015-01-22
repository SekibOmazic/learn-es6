import { square, simpleCounter, dummy, company } from '../src/arrow';

describe('ES6 arrow function', function () {

  // when using jasmine 2.1 instead of minijasminenode (depends on jasmine 2.0) 
  // we could use beforeAll 
  beforeEach(function() {
//    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  });


  it('should square the number', function() {
    expect(square(2)).toBe(4);
  });


  it('should bind to lexical this', function () {
    const obj = dummy;
    expect(obj.method()()).toBe(obj);
  });


  it('can be applied on array functions', function () {
    const arr = [1,2,3,4,5];
    expect(arr.map(element => element*2)).toEqual([2,4,6,8,10]);
  });


  it('should bind to lexical this when using setTimeout', function () {

    simpleCounter.inc();
    simpleCounter.inc();

    // need this to delay jasmine test
    jasmine.clock().tick(10);

    expect(simpleCounter.counter).toEqual(2);
  });


  it ('should compare lexical and context binding', function () {
    let result = ['Sekib likes comSysto', 'Daniel likes comSysto', 'Tom likes comSysto', 'Samer likes comSysto', 'Maxim likes comSysto'];
    expect(company.helloEmployeesClassic).toThrow();
    
    expect(company.helloEmployeesClassicWithBind()).toEqual(result);
    
    expect(company.helloEmployeesWithArrow()).toEqual(result);
  });

});