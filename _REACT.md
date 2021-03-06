## Learning React

### Container vs Component

Containers contain logic for components - they hold/distribute state and props down to components. Components are mostly presentational, they should defer any logic to their container where appropriate.

### Component vs Pure Component (vs Stateless Function)

By default every time state (or props) change in Component it marks shouldComponentUpdate to true and triggers a re-render. PureComponent calls shouldComponentUpdate and performs a shallow comparison to determine if a re-render is necessary (and you can then do a forceUpdate to trigger the render).

Component should be used where you (almost) always expect a state change to trigger a re-render (as it skips the shouldComponentUpdate step which is unnecessary in such cases). PureComponent should be used where only specific state changes will trigger a re-render (user logged in vs logged out for instance), in those specific cases PureComponent is more performant. Any child components of a PureComponent should also be PureComponents (or stateless functions).

Stateless function does no state management or render logic and relies on the component that embeds it for this functionality.

### Index as a key is an anti-pattern

When rendering a list, a key is required, it is inadvisable to use the index for this list unless you are certain the data in the list will never change, e.g.

`{todos.map((todo, index) => <Todo {...todo} key={index} /> )}`

React uses key to identify DOM elements. If you now push a new item to the list, or remove an item from the middle of the list, the key no longer represents the same data but React assumes it does. Instead, always use a unique key unless you can guarantee your list will never change.

## React Router:

To use routing we typically install:

`react-router-dom`

This is a wrapper around react-router (so we don't need to install that directly, it will be installed as a dependency of react-router-dom).

Example setup:

```
import React, { Component } from ‘react';
import { BrowserRouter } from ‘react-router-dom';

class App extends Component {
  render() {
    Return (
      <BrowserRouter>
        // any component in here can now use router
      </BrowserRouter>
    )
  }
}
```

Example usage:

<Route path=”/” exact render={() => // JSX to render } />
<Route path=”/test” render={() => // JSX to render } />

The exact keyword requires an exact match, /test matches any URL which begins with /test (e.g. /test, /test/subpage).

You can use multiples of the same Route anywhere in the component (adjacent, nested in divs etc).

To render components use the component keyword and pass the component import, e.g.

```
import Posts from './Posts';
// … then inside render method
<Route path=”/posts” component={Posts};
```

Links will work natively with Route, but will cause the app to reload when clicked. To prevent this, replace standard `<a href>` links with Route's `<Link>` and pass a “to” property. This can be a string or an object with some additional props such as hash, querystring, e.g.

```
<Link to=”/”>Home</Link>
<Link to={{
  pathname: '/new-post',
  hash: '#submit',
  search: ‘?q=a'
}}>New post</Link>

```

These parameters get passed to the component rendered by the appropriate route as props that can be referenced within the component (e.g. matching the hash or search and triggering some specific behaviour such as scrolling to/displaying a particular element).

To pass these down to children of the rendered component, either explicitly pass them on as props, or alternatively wrap the component using the Route's higher order component withRouter, e.g. using our post component from above:

`export default withRouter(post);`

This makes the component “Route-aware” and will pass down Router related props.

Instead of `<Link/>` we can use `<Navlink/>` which contains some additional props such as a “.active” (by default, can be overriden via the activeClassName prop) class appended to the active route link for styling.

Route path parameters can be passed using a colon separator:

`<Route path=”/:id” exact component={Post} />`

This will make an id parameter available in the component:

`this.props.match.params.id // where “id” is the param name we passed into path`

If there are multiple matching paths, React Router's Switch can be used to tell React to return only the first match:

```
<Switch>
  <Route path=”/” exact component={Posts} />
  <Route path=”/:id” exact component={FullPost} />
</Switch>
```

A Redirect can be used to ensure users arriving via one route are directed to another route:

`<Redirect from “/” to “/posts” />`

### React concepts:

Render props components, compound components and higher order components are all methods of allowing code re-use between components.

#### Render props component

Pass a function as a prop to a component so that the component can use that function to determine what to render, this is a "render prop". Useful where we have some repeated logic in a component, but want to display the results of that logic in several ways: [ReactJS.org render props](https://reactjs.org/docs/render-props.html)

However, render props can lead to obfuscation if over-used (particularly nesting render props). Compound components are another (more advanced) pattern to achieve this.

#### Compound component

...

#### Higher order component

...

## Redux

Install with:

```
npm install --save redux
npm install --save react-redux
```

Central Store (stores state)
Actions - don't know anything about the state in the store, they just pass an “information package” to the Reducers (this may contain a payload)
Reducers - pure functions, receive the action, update the state in an immutable way. Can be multiple, combined reducers.
To retrieve this updated state we use the “subscription model” to receive changes

To set up, we import createStore from redux and use it to create a store and assign to a variable, we then import Provider from react-redux and wrap our app with the Provider, passing our store as a prop:

```
import { createStore } from 'redux';
import { Provider } from 'react-redux';
const store = createStore();
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
```

To connect our containers to the newly created store we use connect - this is a function which returns a function and allows us to pass some configuration into connect:

```
import { connect } from 'react-redux';
class Counter extends Component {
  // our container component
}
export default connect()(Counter);
```

To connect to our store and retrieve the state, we have to map the actions we want to dispatch and the state we want to retrieve, for this we use mapStateToProps (note it could be named anything, it's just an argument we pass to connect), which stores a function which expects the redux state as input and returns a JS object which is a map of prop names and slices of the redux store.

```
const mapStateToProps = state => { // "state" is populated from our redux state
  return {
    ctr: state.counter // allowing us to retrieve state values and assignto props
  };
}
export default connect(mapStateToProps)(Counter);
```

To map the actions we want to dispatch into our store, we do the same using mapDispatchToProps.

```
const mapDispatchToProps = dispatch => {
  return {
      onIncrementCounter: () => dispatch({type: 'INCREMENT'})
    // we assign an anonymous function which returns the action we want to 
    // dispatch when the prop is called
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

If you only need to either retrieve state or pass actions then you either pass null in place of mapStateToProps, or leave out mapDispatchToProps:

```
export default connect(mapStateToProps)(Counter); // only get state
export default connect(null, mapDispatchToProps)(Counter); // only pass actions
```

### Actions

Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.

```
store.dispatch({
  type: SET_VISIBILITY_FILTER,
  filter: SHOW_COMPLETED
});
```

### Action Creators

Action creators are functions that create actions. It's easy to conflate the terms “action” and “action creator”, so do your best to use the proper term. In Redux, action creators simply return an action:

```
function addTodo(text) {
  return {
    type: SET_VISIBILITY_FILTER,
    text
  }
}
dispatch(addTodo(text));
```

### Dispatch()

The dispatch() method can be accessed via store.dispatch() or by mapping dispatch to props and using react-redux's connect() method.

### Reducers

The reducer is a pure function that takes the previous state and an action, and returns the next state.

`(previousState, action) => newState`

It's very important that the reducer stays pure. Things you should never do inside a reducer:

* Mutate its arguments;
* Perform side effects like API calls and routing transitions;
* Call non-pure functions, e.g. Date.now() or Math.random()

Example reducer:

```
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, { 
        // note we clone the state, assigning/returning the cloned state plus the new value in order to not mutate the state
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```

Note: `Object.assign(state, { visibilityFilter: action.filter })` is also wrong: it will mutate the first argument. You **must** supply an empty object as the first parameter.

### combineReducers()

The `combineReducers()` method allows us to split reducers for readability and then combine them into a signle argument to pass into `createStore()`. We can also take advantage of ES6 `import` to have all of our reducers in a separate file, each exported separately, and import/combine them like so:

```
import { combineReducers } from 'redux'
import * as reducers from './reducers' // gets reducers as an object with their names as the keys
const todoApp = combineReducers(reducers)
```



