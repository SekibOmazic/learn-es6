export function simpleArray() {
  return ['We', 'learn', 'ES6'];
}

export function employeeOfTheMonth() {
  return { name: 'Sekib', title: 'Chief Relaxing Officer', company: 'comSysto' }
}

export function biggerObject() {
  return {
    firstName: 'Sekib',
    lastName: 'Omazic',
    id: 21,
    contact: {
      twitter: 'SekibOmazic',
      email: 'sekib.omazic@gmail.com'
    }
  }
}

export function simpleUser({first= 'Sekib', last= 'Omazic', settings = {news:false, premium:false}} = {}) {
  return {
    firstName: first,
    lastName: last,
    settings: settings
  };
}
