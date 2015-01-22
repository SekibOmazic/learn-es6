# Default parameters

Old school parameter checking:

```Javascript
function init(name, age) {
  var displayName = name || 'anonymous';
  var adult = (age && age > 20) || false; // assumes you pass a number for age.
  
  // do something useful
}
```

Default parameters allow function parameters to be initialized if no value or undefined is passed:

```Javascript
function init(name = 'anonymous', age = 0) {
  let adult = age > 20;
  
  // do something useful with name and adult flag
}

init();
init('Young Hipster');
```

A function call can also be passed in:

```Javascript
init(getUserName(), getAge(user.getBirthday()));
```
