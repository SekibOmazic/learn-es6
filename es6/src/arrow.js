let square = x => x*x;

// if you define method as an arrow function
// it won't work. Why?
const dummy = {
  method: function () {
    return () => this
  }
};

let simpleCounter = {
  counter: 0,
  inc: function () {
    setTimeout(() => {
      // this is lexically scoped
      this.counter++
    }, 0);
  }
};


var company = {

  name: 'comSysto',
  employees: ['Sekib', 'Daniel', 'Tom', 'Samer', 'Maxim'],

  helloEmployeesWithArrow: function() {
    return this.employees.map(emp => emp  + ' likes ' + this.name);
  },

  helloEmployeesClassic: function() {
    return this.employees.map(function(emp) {
      return emp  + ' likes ' + this.name;
    });
  },

  helloEmployeesClassicWithBind: function() {
    return this.employees.map(
      function(emp) {
        return emp  + ' likes ' + this.name;
      }.bind(this)
    );
  }

};

export {
  square,
  simpleCounter,
  dummy,
  company
};
