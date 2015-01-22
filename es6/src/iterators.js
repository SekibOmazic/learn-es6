function Iterator (collection) {
  this.index = 0;
  this.collection = collection;

/*
  this.next = () => {
    if (this.index < this.collection.length) {
      return { value: this.collection[this.index++], done: false };
    }

    return { value: undefined, done: true };
  }
*/
}


Iterator.prototype.next = function() {
  if (this.index < this.collection.length) {
    return { value: this.collection[this.index++], done: false };
  }

  return { value: undefined, done: true };
};


function Company(name) {
  this.name = name;
  this._staff = [];

  //this.add = (emp) => {this._staff.push(emp)};
}

Company.prototype.addEmployee = function (employee) {
  this._staff.push(employee);
};

Company.prototype.employees = function() {
  return this._staff;
};

Company.prototype[Symbol.iterator] = function() {
  return new Iterator(this.employees());
};

export { Company };
