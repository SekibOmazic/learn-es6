import { totalPrice } from '../src/restSpread';

describe('ES6 rest parameters', () => {

  it('should call a function with rest parameters', () => {
    let total = totalPrice(19, 10, 70, 20);

    expect(total).toBe(119);
  });


  it('should call a function without rest parameters', () => {
    let total = totalPrice(19);

    expect(total).toBe(0);
  });

});


describe('ES6 spread operator', () => {

  it('should spread array elements', () => {
    let german = ['BMW', 'Audi'];
    let italian = ['Fiat', 'Maserati'];

    let cars = [...german, 'Jaguar', ...italian];
    expect(cars.length).toBe(5);
  });

});