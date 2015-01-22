import { usersWidget } from '../src/templateStrings';

describe('ES6 template strings', () => {

  it('should replace many expressions', () => {
    let sons=[{first:'Alan', last: 'Omazic'}, {first:'Arian', last: 'Omazic'}];
    let html = usersWidget(sons);

    expect(html).toEqual('<ul><li>Alan Omazic</li><li>Arian Omazic</li></ul>')
  });

});
