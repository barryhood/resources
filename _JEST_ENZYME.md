`describe()` is automatically made available by Jest. Takes two arguments:

1) A description of the test (appears in console when test is run)
2) The function that holds the test

```
describe('<NavigationItems/>', () => {
  // test logic
})
```

`it()` allows you to write (or describe) one single test, takes two arguments:

1) A string that appears in the console
2) A test method

```
describe('<NavigationItems/>', () => {
  it('should render two navigation items if user not authenticated', () => {
    // test
  }
})
```

`shallow()` renders component with all content but not deeply rendered, i.e. subcomponents of the component being tested are rendered, but only as placeholders, not as fully realised component instances, allowing us to test e.g. that they are rendered without potentially fully rendering a whole sub-tree of components.

`expect()`: Once the component is rendered we write our expectation, the thing we want to check.
