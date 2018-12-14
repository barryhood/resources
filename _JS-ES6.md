
### Currying

Currying is a technique whereby instead of passing multiple arguments to a function, we call a function with a single argument which returns a function and that function is called with the next argument (and so on, for all the arguments).

e.g. here is a non-curried function:

```
const dragon = (name, size, element) => 
  `${name} is a ${size} dragon that breathes ${element} !`

console.log(dragon('fluffykins', 'tiny', 'lightning'));
```

Can become:

```
const dragon =
  name =>
    size =>
      element =>
       `${name} is a ${size} dragon that breathes ${element} !`

console.log(dragon('fluffykins')('tiny')('lightning'));
```

The purpose of doing this is that it lets you incrementally pass parameters into your function, for instance:

```
const dragon =
  name =>
    size =>
      element =>
       `${name} is a ${size} dragon that breathes ${element} !`

const dragonNamed = dragon('fluffykins');
const dragonSized = dragonNamed('tiny');
const dragonBreath = dragonSized('lightning');

console.log(dragonBreath);
```




