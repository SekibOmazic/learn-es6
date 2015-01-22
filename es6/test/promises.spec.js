import { getRecommendedArticleWithCallbacks, getRecommendedArticleWithPromises, delayed } from '../src/promises.js';

describe('ES6 promises', () => {

  // when using jasmine 2.1 instead of minijasminenode (depends on jasmine 2.0)
  // we could use beforeAll
  beforeEach(function () {
//    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  });


  it('should read files with callbacks', (done) => {
    getRecommendedArticleWithCallbacks(1234, function(result) {
      expect(result.name).toEqual("JavaScript for Dummies");
      done();
    });

  });


  it('should resolve simple promise', (done) => {
    let somePromise = new Promise((resolve, reject) => {
      resolve('comSysto rulez');
    });
    
    somePromise.then(result => {
      expect(result).toEqual('comSysto rulez');
      done();
    });
    
  });


  it('should reject simple promise', (done) => {
    let somePromise = new Promise((resolve, reject) => {
      reject('Oh my ...');
    });

    somePromise.catch(reason => {
      expect(reason).toEqual('Oh my ...');
      done();
    });

  });


  it('should resolve with shortcut', (done) => {
    let somePromise = Promise.resolve('Oh my ...');

    somePromise.then(reason => {
      expect(reason).toEqual('Oh my ...');
      done();
    });

  });


  it('should resolve promises with thenables', (done) => {
    let aPromise = new Promise((resolve, reject) => {
      resolve('Chain me');
    });

    let anotherPromise = new Promise((resolve, reject) => {
      resolve(aPromise);
    });

    let yetAnotherPromise = new Promise((resolve, reject) => {
      resolve(anotherPromise);
    });

    yetAnotherPromise.then(reason => {
      expect(reason).toEqual('Chain me');
      done();
    });

  });


  it('should resolve simple chain of three promises', (done) => {
    let promise = new Promise((resolve, reject) => {
      resolve('I');
    });

    promise
      .then(result => {
        return Promise.resolve(result + ' love ')
      })
      .then(result => {
        return Promise.resolve(result + 'comSysto')
      })
      .then(result => {
        expect(result).toEqual('I love comSysto');
        done();
      });

  });


  it('should read files with promises', (done) => {
    getRecommendedArticleWithPromises(1234, (err, result) => {
      expect(result.name).toEqual("JavaScript for Dummies");
      done();
    });

  });


  it('should resolve with timeout', (done) => {
    let p1 = new Promise(function(resolve, reject) {
      
      setTimeout(function() {
        resolve("after 2 sec.");
      }, 2000);

    });

    p1.then(value => {
      console.log(value);
      expect(true).toBeTruthy();
      done();
    });

    // delay jasmine test execution
    jasmine.clock().tick(3001);
  });


  it('should resolve only one promise', (done) => {
    
    let [p1, p2] = [delayed('I am fast', 1000), delayed('I am even faster', 500)];

    Promise.race([p1, p2])
    .then(function (winner) {
        expect(winner).toEqual('I am even faster');
        done();
      });

    // delay jasmine test execution
    jasmine.clock().tick(2001);
  });
  
  
  it('should wait for all promises to resolve', (done) => {
    let [p1, p2, p3] = [delayed('short-term loan', 500), delayed('long-term loan', 1000), delayed('morgage', 1500)];

    Promise.all([p1, p2, p3]).then(paidDebts => {
      expect(paidDebts.length).toBe(3);
      done();
    });

    // delay jasmine test execution
    jasmine.clock().tick(3001);
  })

});
