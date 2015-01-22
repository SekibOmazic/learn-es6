import { Company } from '../src/iterators.js';

describe('ES6 iterators', () => {

  it ('should iterate over an array with for-of loop', () => {
    const numbers = [1, 2, 3, 4,  5];
    let sum = 0;

    for (let nr of numbers) {
      sum += nr;
    }

    expect(sum).toBe(15);
  });


  it ('should iterate over collection via custom iterator', () => {
    let comSysto = new Company('comSysto GmbH');

    comSysto.addEmployee('Sekib');
    comSysto.addEmployee('Samer');

    let employees = [];
    for (let e of comSysto) employees.push(e);

    expect(employees).toEqual(['Sekib', 'Samer']);
  });


});
