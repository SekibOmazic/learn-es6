import { simpleArray, employeeOfTheMonth, biggerObject, simpleUser } from '../src/destructuring';

describe('ES6 destructuring assignment', () => {

  it('should dismantle an array', () => {
    let [, , c] = simpleArray();

    expect(c).toEqual('ES6')
  });


  it('should dismantle simple object', () => {
    let { name: username, title: job } = employeeOfTheMonth();

    expect(username).toEqual('Sekib');
    expect(job).toEqual('Chief Relaxing Officer');
  });

  it('should dismantle a bigger object', () => {
    let {
      firstName: nick,
      contact: {twitter: twitterName}
    } = biggerObject();
    
    expect(nick).toEqual('Sekib');
    expect(twitterName).toEqual('SekibOmazic')
  });


  it('should also work with default parameters', () => {
    let user = simpleUser();
    expect(user.settings.news).toBe(false);
    expect(user.settings.premium).toBe(false);
    
    let boss = simpleUser({first:'Arian', settings: {premium:true}});
    expect(boss.firstName).toEqual('Arian');
    expect(boss.settings.premium).toBe(true);

    // explain this
    expect(boss.settings.news).toBeUndefined();
  });

});