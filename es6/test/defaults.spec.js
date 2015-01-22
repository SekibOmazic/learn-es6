import { init } from '../src/defaults';

describe('ES6 default parameters', () => {

  it('should call a function without parameters', () => {
    let user = init();

    expect(user.username).toEqual('anonymous');
    expect(user.chatRoom).toEqual('Frontend freaks');
    expect(user.advanced).toBe(false);
  });


  it('should call a function with some parameters', () => {
    let user = init('Sekib');

    expect(user.username).toEqual('Sekib');
    expect(user.advanced).toBe(false);
  });


  it('should pass null and undefined', () => {
    let user = init('Sekib', null, undefined);

    expect(user.username).toEqual('Sekib');
    expect(user.advanced).toBe(false);
    expect(user.chatRoom).toBeNull();
  });


  it('should pass a function call', () => {
    let room = () => 'Private room';

    let user = init('Sekib', room(), undefined);

    expect(user.username).toEqual('Sekib');
    expect(user.chatRoom).toEqual('Private room');
    expect(user.advanced).toBe(false);
  });

});