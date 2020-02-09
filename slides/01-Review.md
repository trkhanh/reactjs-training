# Review of React

---

# Components

- Basic building blocks of React
- Represents a portion of the UI

Notes: React is based on components. Components are the building blocks of your UI, where each component renders some portion of HTML in your user interface. Components enable us to write clean and reusable code. When we say "clean", we mean code that is of a manageable size and that can be understood within a reasonable time frame. The code is reusable because components are UI recipes that can be used repeatedly throughout your app.

---

## What's Great about Components

- Strong separation of concerns
- Composability
- Reuse

Notes: React's component-based approach to rendering UI comes with a lot of
advantages. Display logic and markup are inherently coupled in any reasonably
sized application, so React embraces that coupling at the component level by truly separating _concerns_ and not just files. In practice this means underlying data structures or API calls can change without needing to rewrite presentation logic.

Other benefits to componentization are unit-testability and reuse. We can encapsulate pieces of our application UI for easy reuse. This is exemplified by 3rd party component libraries. You can reuse UI components like lego blocks to quickly build new applications without having to rewrite DOM interaction code.

---

## React is Declarative

- Abstract out DOM interactions
- Focus on app functionality

Notes: Interacting with the DOM is an inherently imperative experience. Without the help of a declarative framework, you have to describe the exact steps to update the DOM elements. Fortunately, React hides the imperative nature of DOM through a declarative and sanitized API. We, as developers, benefit from this feature because we can focus on what the app should look like and do. We spend much less time instructing the browser on how to achieve our desired outcome. Sometimes directly dealing with the DOM is unavoidable. React provides escape hatches in those circumstances, but in our experience you rarely need to use them.

---

# VDOM

- In-memory
- Abstract representation of your UI
- Empowers declarative React model

Notes: React uses an in-memory virtual DOM (VDOM). VDOM is an abstract representation of the UI that React renders from your component hierarchy. When one or more components in the component tree update, the VDOM is updated to reflect those changes. React then pushes updates to the client DOM based on the difference between the state of the VDOM and browser DOM. This is sometimes referred to as "smart diffing".

VDOM acts as an abstraction layer between our declarative component structure and the imperative DOM. React automatically handles the transition between VDOM and DOM.

---

# JSX

- Rendering and UI logic are coupled
- Syntax extension on JavaScript

Notes: Facebook engineers realized that rendering logic and UI logic can be inherently coupled; what something looks like is intertwined with how it behaves. They embraced that coupling by creating JSX, a syntactic extension to JS. JSX combines JavaScript and HTML into a system that feels familiar to both HTML and JS users. With JSX, you can write complex but intuitive UI code.

---

# Components

---

```javascript
const Welcome = () => <h1>Hello, World!</h1>;
```

Notes: The simplest way to think of components is as a JavaScript function. A function takes optional input and returns an optional value. Similarly, React function components take optional input and return valid JSX.

In our example, we have a function that requires no arguments and returns some JSX (not HTML). This is a bona fide component! It is important to remember that the `h1` tag returned by the Welcome component is not HTML at this point. It is JSX which will be converted to a React element which will be converted to a DOM element.

---

```javascript
const Welcome = props => <h1>Hello, {props.name}!</h1>;
```

Notes: What if we want our component to accept an "input" value. We can do that through a React feature called "props". "Props" is short for "properties", and it's a key piece of what makes React so powerful. We will cover props extensively in the next chapter. For now, you can think about it as a way to supply variable arguments to your component.

---

## Class Components

- Based on ES6 classes
- Uses `this` keyword
- Extends `React.Component`

Notes: So far, we've only seen function components. However, there is an alternative.

Class components are the "original" way to write components. A class component can have instance variables and methods. It references those internal attributes via the `this` keyword. To write a class component, your ES6 class must extend `React.Component` or `React.PureComponent`.

Until hooks were introduced, class components were the only way to access core React features like state and lifecycle methods. If you don't know what that means yet, don't worry! We cover those concepts later.

---

```javascript
const Welcome = props => <h1>Hello, {props.name}!</h1>;

// OR

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

Notes: Here are two components that produce the same UI. One is a function component and the other is a class component.

React will render the return value fo a function component. On the other hand, a class component must define the `render` method. React will render the return value of the `render` method.

---

## Composition Over Inheritance

Notes: In the heyday of object-oriented programming, app functionality was enhanced through the concept of inheritance. A class can inherit, or gain, a parent's functionality by extending the parent's class.

Composition is an alternative approach to writing code that favors combining simple units of code into more sophisticated units. React chose a compositional model. Aside from extending `React.Component` to write class components, you will not use inheritance in your React code.

---

## Composing Components

```javascript
const Header = () => {
  return <Welcome name="World" />;
};

// OR

class Header extends React.Component {
  render() {
    return <Welcome name="World" />;
  }
}
```

Notes: React components can return any React element, as well as other React
components. In the example above, the `Header` component is returning the
`Welcome` component which returns an `h1` element. One thing to remember is that
components that you create must be capitalized. This is because JSX looks for
lowercase names as built-in elements (ie. `div` or `h1`) and capitalized
components as user-defined components (ie. `Welcome`, not `welcome`) within your
code base.

---

## Composition Rules

- Return any combination of React components and elements
- Built-in React elements are lowercase
- Custom React components are TitleCase

Notes: To summarize, follow these rules when composing components together.

---

```javascript
const Header = () => (
  <div>
    <Welcome name="World" />
    <Welcome name="Galaxy" />
    <Welcome name="Universe" />
  </div>
);
```

Notes: In this example, we're composing multiple components. You'll notice that we've wrapped multiple components in one `div` element. We've created a component hierarchy where there are 3 sibling `Welcome` components surrounded by a `div` element.

As a side note, before version 16 React enforced a variant that a component could only return a single element. As of v16, you can also return an array of elements to render to the screen (useful for lists).

---

```javascript
const Header = () => (
  <React.Fragment>
    <Welcome name="World" />
    <Welcome name="Galaxy" />
    <Welcome name="Universe" />
  </React.Fragment>
);

// OR

const Header = () => (
  <>
    <Welcome name="World" />
    <Welcome name="Galaxy" />
    <Welcome name="Universe" />
  </>
);
```

Notes: To avoid returning empty `div`s throughout our codebase, we can return a React Fragment that wraps the components of interest. The shorthand for `React.Fragment` is the empty tag like `<>....</>`

---

```javascript
const Navigation = () => (
  <>
    <Header />
    <div>
      <Link />
      <Search />
    </div>
  </>
);
```

Notes: We're not restricted to one level deep of composition. We can formulate any combination of components that we like.

While we haven't specified how each component is implemented, we can still see that there is structure to our `Navigation` component. It has two direct children, and some more distant offspring as well.

---

## Use Function Components

- Simpler
- Lower overhead
- Less bundle bloat

Notes: When writing a new component, try to use a function component whenever possible. The React community is moving away from ES6 classes. The `class` syntax can cause confusion, bugs, and significantly larger file sizes. Conversely, function components are simpler, have lower performance overhead, and create less bundle bloat. Since the introduction of hooks (a concept that we will cover later), there are fewer reasons to use class components.

---

## Babel Compilation

> https://babeljs.io/en/repl

Notes: JavaScript is constantly improving as a language. New language features are proposed and adopted in multiples stages. Newly approved features are then implemented by each browser (Chrome, Firefox, Safari, etc), but this takes time. Moreover, only the newest versions of browsers support the most recent JS features. Developers are generally an impatient bunch--unwilling to wait for end-users to install the latest browsers. As a result, a tool called Babel was developed. Babel transforms JS code into backwards compatible code. This means that we can write our apps using the most modern language features without needing to cater to the lowest common denominator (the oldest browsers). The above website shows you what your modern JS code is transformed into via the Babel toolset. You can choose different configurations to support newer features and/or older browsers.

---

## Babel Class Input

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Greetings, Earthling.</h1>;
  }
}
```

Notes: This is a demonstration on why class components can be a less advantageous choice versus a function component. In 6 lines of code, we have a simple class component that renders an `h1` element. Classes are a newer feature of JavaScript, so Babel has to transform the code to backwards compatible code. Into how many lines of code do you think this simple class component will be transformed?

---

## Babel Class Output

```javascript
"use strict";

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

var Greeting =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(Greeting, _React$Component);

    function Greeting() {
      _classCallCheck(this, Greeting);

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(Greeting).apply(this, arguments)
      );
    }

    _createClass(Greeting, [
      {
        key: "render",
        value: function render() {
          return _react.default.createElement(
            "h1",
            null,
            "Greetings, Earthling."
          );
        }
      }
    ]);

    return Greeting;
  })(_react.default.Component);
("use strict");

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

var Greeting =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(Greeting, _React$Component);

    function Greeting() {
      _classCallCheck(this, Greeting);

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(Greeting).apply(this, arguments)
      );
    }

    _createClass(Greeting, [
      {
        key: "render",
        value: function render() {
          return React.createElement("h1", null, "Greetings, Earthling.");
        }
      }
    ]);

    return Greeting;
  })(React.Component);
```

Notes: Using standard configurations, Babel generates 42 lines of backwards compatible JS out of a 6-line class component. That is a sizeable increase. Notice how the transformed code includes many class-specific functions, e.g. `_createClass` and `possibleConstructorReturn`. Babel has to generate these methods because its target version of JavaScript wouldn't know how to run class-based code. To make matters worse, there is a performance overhead to instantiating and running (transformed) classes. There is a lot of room for improvement.

---

## Babel FC Input

```javascript
const Greeting = () => <h1>Greetings, Earthling.</h1>;
```

Notes: Let's try rewriting the same component using a function component. Notice that the functional component definition is already 4 lines shorter in length than its class counterpart.

---

## Babel FC Output

```javascript
var Greeting = function Greeting() {
  return React.createElement("h1", null, "Greetings, Earthling.");
};
```

Notes: For a 1-line functional component with identical behavior to the class component, Babel produces 3 lines of JS. There are no signs of class-specific support. On top of a smaller amount of code, a functional component will also be faster without the class instantiation overhead. While there there are cases when a class component is a good choice, using class components will introduce bloat to your Babel output and ultimately to your bundle size. In a full-feature website, your user might feel the effects when they're trying to load your bundle.

---

## Component Tips

- Avoid dumping grounds
- Single responsibility
- Render functions should fit on the screen.


Notes: Keep the following guidelines in mind when writing React code. Of course, there are always exceptions to rules. These are simply helpful tips.

---

# Props

---

## Props

- Passed in by parent
- Read only
- Only flow down the tree
- Any valid JavaScript

Notes: Props are variables passed to a component by its parent. Those variables are placed on a single object called `props` which stands for "properties". Props are passed from parent to child through the component tree.

---

```javascript
const Child = props => {
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.age}</h2>
    </div>
  );
};

const Parent = () => {
  const age = 15;

  return <Child name="Timmy" age={age} />;
};
```

Notes: Function components receive props as the first argument. Here we're passing in two props (name and age) to a function component. In JSX, props are passed in like html attributes. Hardcoded strings can be passed directly if they won't ever change. The brackets around the age look a bit funny but are for JSX to know we're evaluating a JavaScript value. Generally you'll pass in variables between brackets for most props. You might be wondering why we have age equal age. As of right now there isn't a shorthand syntax for passing in props that are the same name as a variable. There's open issues on React, Typescript, Babel that have been open for many years if you're interested in following the discussions.

---

```javascript
class Welcome extends React.Component {
  // Constructor takes props as an argument
  constructor(props) {}

  render() {
    // Every other method has access to this.props
    return <h1>hi {this.props.name}</h1>;
  }
}
```

Notes: Class components can access `this.props` in render and other lifecycle methods. Though `constructor` is called with props directly.

---

```javascript
// BAD
Button.propTypes = {
  fetchData: PropTypes.function
};

// BETTER
Button.propTypes = {
  onClick: PropTypes.function
};
```

Notes: Props are the API of of components. It's important to keep component APIs clean and useful. Props should be descriptive and to the level of abstraction that makes sense for that component. Props should not be dependent on the rest of the app, they should be self explanatory for the component so a developer doesn't have to dig through the source or rest of the app to understand.

PropTypes is one of a few ways to define and validate your component props. If you are using TypeScript or Flow, Props are still typed but will look a little different.

React exposes a proptypes package if you're not using TypeScript or Flow which will throw warnings during development for invalid props. We recommend at least some for of validation, be it proptypes, typescript, or flow.

---

```javascript
const Welcome = props => {
  props.name = "Bob";
  return <h1>Hello, {props.name}!</h1>;
};

// TypeError: Cannot assign to read only property 'name' of object '#<Object>'
```

Notes: One of the most important rules in React is that you cannot modify props. This is because props are `read-only` and breaking this rule will lead to the above error.

Props are read only for multiple reasons. Other components may be using that data in their render functions so mutating it in place would affect the component tree. Read only props protect from infinite loop renders and other circular tree dependencies.

React expects that props should always flow downward from parent to child and be immutable. These two guarantees allow for performance benefits and render safety. It also means your code is easier to reason about and maintain.

---

## Children

```javascript
const Title = props => {
  return (
    <h1>{props.children}</h1>
  );
};

const Parent = () => {
  return <Title>Hello</Title>;
};
```

Notes: props.children is a special prop name in react. Whatever is passed in between the open HTML brackets gets attached to props.children. It can be a string, a variable, or more react components. This enables easy composition of component hierarchies. You have to be careful with children... since it allows for potentially any components to be rendered within the structure. In most cases, this is exactly what you want. In other cases, you may want to document what are acceptable children for a component so as not to break layouts or create invalidly nested HTML.

---

## Other special props

- key
- ref

Notes: Key and ref are two other props that behave differently. For these props, they are reserved for react and are not available on the props object.

---

## key

```
<ul>
  {albumTitles.map(({ id, name }) => {
    return <li key={id}>{name}</li>;
  })}
</ul>
```

Notes: key is a unique identifier on list items. Not necessarily li tags like this example, but dynamically returned items from arrays. It's a special React construct for React to keep the virtual DOM and real DOM in sync and correctly update the real DOM as needed. Each key has to be unique and all dynamically rendered lists are required to have keys.

---

## ref

```javascript
<input
  type="checkbox"
  ref={(domElement) => { /* Handle DOM weirdness here*/ }}
/>
```

Notes: refs are an escape hatch for direct DOM manipulation. Ref as in reference to the dom node. There are two main APIs for creating refs. This is a callback ref, where we pass in a function to the special prop ref and that function is called with a reference to the DOM node of that input. Refs can be attached to HTML nodes or class components. On a class component, the element returned is not a DOM node but the mounted instance of that class. Refs can't be attached to a function component since there is no mounted instance to return.

---

## React.createRef

```javascript
class Counter extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  render() {
    return (
      <form>
        <input ref={this.inputRef} />
      </form>
    );
  }
}
```

Notes: React also exposes a create ref method. We'll learn about lifecycle methods like constructor in the next chapter but this is another way to attach a ref to a class property. Refs are rarely used but may be necessesary for things like complex animations or focus manipulation. Usually large applications can avoid refs unless there are crazy requirements.

---

## HTML Elements

```javascript
return (
  <div>
    <h1>Hello</h1>
  </div>
);
```

Notes: Every branch in the component tree must eventually lead to something like this. Browsers still only understand HTML despite ongoing best efforts. This may look like HTML but it's really a call to react.createElement, since we're writing JSX and not HTML. Because this is JSX, there are certain differences from HTML that we need to call out.

Sidenote, you can also use React to render SVGs since that's also valid HTML. All of this also applies to SVGs.

---

## HTML Props

- className
- htmlFor
- style
- onChange
- value
- checked
- selected
- dangerouslySetInnerHTML
- suppressHydrationWarning
- suppressContentEditableWarning

Notes: Most HTML attributes are 1:1 with their browser counterparts with a few important exceptions. className is probably the most obvious. When adding classes for CSS, we have to use className. This is because class is a reserved word in JavaScript.

htmlFor is the form label equivalent of for. For is a also reserved word in JavaScript so it's been changed.

style takes a JavaScript object instead of a string of CSS. The keys for this object are camelCased versions of their CSS counterparts. This is mainly used for dynamic styling based on some computation.

onChange behaves as expected with the caveat that this isn't a browser event due to differences in browser implementation. React normalizes these events and the callback receives a normalized event object.

value is how we handle form controls and is different from the HTML attribute value. Value is only ever updated by our code, so we need to make sure we're capturing user input in onChange and updating value accordingly.

checked is the checkbox equivalent of value and behaves similarly.

Selected is another form attribute for controlling dom state on options elements within a select element.

dangerouslySetInnerHTML is a fun one. It's another escape hatch that could open your site to cross site scripting attacks if you're not careful. If you absolutely need to inject some safe but unknown HTML into your app, this is React's way to do it declaratively.

suppressHydrationWarning - this is for server rendered code. React tries to verify that the server render and initial client render match. If they don't, you get a warning. Sometimes this mismatch is unavoidable so you can suppress the warning.

suppressContentEditableWarning - elements marked as content editable with throw this warning if you attempt to render them with children. These last three are very rarely used.

---

## Spread Operator

```javascript
const Welcome = props => {
  const { name, ...rest } = props;

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <Content {...rest} />
    </div>
  );
};
```

Notes: Spread Operator - That sounds like a subway job but it's a standard ES6 feature that's been adapted into JSX. Here we're using it in two different ways. Spread syntax is the three dots before the rest, in the first case it's used as part of object destructuring. rest is a common name here but it's arbitrary on the second line. We're saying grab the property name from props and assign it to a local variable name. Then assign all other key value pairs to a new object called rest. In our JSX, we use the curly braces to jump into JavaScript and here the spread operator tells React to pass all key value pairs from rest to the Content component as props. There are other uses of the spread operator available in ES6 with arrays and objects.

Spread syntax is super useful for variable creation but we generally try to avoid situations like the above where it's unclear what is being passed down to Content. Now if we had proper typing for this component it's a different story. Ideally it would be clearly evident in this file what props are passed to Content.

---

## Render Props

```javascript
List = ({ items, renderItem }) => {
  return <ul>{items.map(renderItem)}</ul>;
};

App = () => {
  return (
    <div className="App">
      <List
        items={items}
        renderItem={({ id, name }) => {
          return <li key={id}>{name}</li>;
        }}
      />
    </div>
  );
};
```

Notes: A Render Prop is when a component exposes a prop for a function that renders a React element. It’s one way to encapsulate behavior and provide values to rendered components.

In this example, we use a `List` component that takes in the items to display and a function that determines how to render each item.

Render props came about to solve certain use cases where you need to subvert the flow of props from parent to child. The main use case is when you want to encapsulate dynamic UI or data changes in a component while still giving the consumer of that component control.

Generally speaking render props are worth trying to avoid. You need to understand them to consume third party libraries but most app developers have other ways to solve these scenarios in the context of an app. If you find yourself needing to encapsulate UI logic or dynamic data in a component, render props can be useful but most apps don't export complex components like those. Render props often lead to messy code and convoluted component trees that are hard to reason about.

---

# Component State

Notes: Applications are dynamic and need to change depending on user actions
and events. React uses `state` to as one way to handle updates to the DOM and refresh what the user sees.
State is just a class property that is initialized and managed by the component itself, like other class fields. State must be initialized in a class component. Although tomorrow you'll see how hooks circumvent this and allow us to handle state in a function component.

---

```javascript
class Counter extends React.Component {
  state = {
    numberOfClicks: 0
  };

  render = () => {
    return (
      <div>
        <h1>Clicks: {this.state.numberOfClicks}</h1>
      </div>
    );
  };
}
```

Notes: Great! We've set some state, it doesn't look very dynamic. This component will always show `Clicks: 0`.

---

## Setting State

```javascript
class Counter extends React.Component {
  state = {
    count: 0
  };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}
```

Notes: That's better, here we've got a click handler that calls setState which then triggers a re-render with the new state.

In React, state is updated by using this method called `setState`. Once `setState` is called, React is notified to update the components state internally and will call the render method again. If the output of render has changed, React will push those changes to the DOM.

---

## setState is asynchronous

```
setState(newState, () => {
  // DOM Updates finished
  // this.state is now updated
});
```

Notes: It's important to note that `setState` is asynchronous and React "batches"
updates under the hood.

There's a few reasons for this. The biggest is that batching is crucial to the performance of React. If every setState call was synchronous and triggered an immediate re-render, the UI could slow to a crawl with certain user interactions. Batching setState calls inherently leads to setState being asynchronous since React waits for all state updates to complete before updating the DOM.

---

```javascript
class Counter extends React.Component {
  state = {
    count: 0
  };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}
```

Notes: Now that we know setState is asynchronous, does anyone see a problem with this code?

What would happen if we click the button faster than the setState calls?

We'd potentially run the handleClick method with an outdated this.state value, incorrectly counting.

If you are not careful, this can lead to strange bugs where you
may receive outdated information.

---

```javascript
class Counter extends React.Component {
  state = {
    count: 0
  };

  handleClick = () => {
    this.setState(currentState => {
      {
        count: currentState.count + 1;
      }
    });
  };

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}
```

Notes: Here's a better approach.We can pass a function that allows React to call it with
the updated values of state and props.

You can lint for these cases to prevent weird bugs.

---

## More Key Points

- State is encapsulated
- State can be passed to children as props
- State only flows down
- Updates only affect derived UI

Notes: State is encapsulated. Parents and children have no idea if a component is stateful or not.

A component can pass its state down to a child as a prop.

State flows down in the React component tree.

Updating state only affects the UI that is derived from that state or child components that use it below in the tree.

This is important. In some cases local state is very performant for applications because you can limit the scope of the tree changes. We've talked about some reasons to avoid class components but there are also very valid reasons to use them like managing state across the component lifecycle.

---

```javascript
class NameInput extends React.Component {
  state = { name: "" };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <input
        type="text"
        placeholder="First Name"
        value={this.state.name}
        onChange={this.handleChange}
      />
    );
  }
}
```

Notes: React enforces the concept of unidirectional data flow, where data only flows downwards. A good example of Reacts data flow is an input element. In this example, the `NameInput` component is the parent of the `input` element. `NameInput` holds the value of `name` in its `state`.It passes this value down to its child `input`. When a user types into the input field, the `handleChange` method is called and updates the state of the `NameInput` component. When the state is updated, React re-renders the component and its children.

What happens if we were to remove the `onChange` property on the input element and type in the input field? The value of the input field wouldn't update. That's because React is not listening to the input fields events and the input field can't tell React to update its state. It can only announce that its value has changed and let React choose how to respond to it. In this way, React is one-way binding.

---

## When to Avoid Component State

- When it's passed to numerous descendant components
- When it's a large or nested object

Notes: Local state can get unwieldy fast. More often than not, what starts out as local state ends up being state that should be share by multiple components AKA application state. With React's component tree, you'd have to move all this state into a common ancestor component in order to share state with sibling or components on other tree nodes.

Component state should be used sparingly when it's clear that the state will only relate to the current component or direct child components. For example, certain input components in component libraries may want to control their own validation state or tooltip state. Generally though most state in an application is bigger than a single component. For this we have a few options for application state stored outside of the component tree.

---

## Lifecycle Methods

Notes: We can use class component lifecycle methods when we need to enhance the behavior of a component. The following are a commonly used subset of lifecycle methods.

---

## constructor()

- Runs on first render of the component before any other methods
- First argument is props
- Must call super() first
- Only called once

Notes: We've already seen `constructor`. It is most commonly used to initialize component state as a function of props.

---

## render()

- The output of your component
- Called repeatedly
- Where the magic happens

Notes: `render` is a mandatory lifecycle method that returns elements that are drawn to the screen. It can return any valid React element type. If you forget to return a value from `render`, that is the same as returning `undefined`. React will warn you in the developer console.

---

## componentDidMount()

- Called once updates are in the DOM
- Called only once

Notes: `componentDidMount` is the sign that React mounted your component successfully. If you want a particular side-effect like an API request to be executed only once per component instance, or adding an interval, this is generally where it belongs. Direct DOM manipulations would also be placed here.

---

## componentWillUnmount()

- Called at the end of the component life cycle
- Called only once

Notes: `componentWillUnmount` is the inverse of `componentWillMount`. It indicates that React is preparing to remove your component from the tree/DOM. If you need to clean up any outstanding API requests or other side-effects, you should do that here.

In combination `componentWillMount`, these two methods are handy for setting and cleaning up timers, intervals, or event listeners safely.

---

## shouldComponentUpdate()

- Called before render
- useful for perf

Notes: We won't go into detail here but this is a useful method if you need to do some serious performance tuning. Allows you tell React if a component should render or not based on props and state.

---

## componentDidUpdate()

- Useful for weird DOM manipulations
- Not used very frequently

Notes: componentDidUpdate is useful if you need to handle weird DOM manipulations every time a change is pushed to the DOM. This one comes up very infrequently. There are other lifecycle methods, but we won't be covering them. They are escape hatches that are occasionally needed for strange UI or performance tweaks but can generally be left alone.

---

# Exercises

1. Implement the `Denied` component
2. Update the App component to hold state
3. Start an interval on component did mount
4. Clean up interval
5. Add class methods to the App component
6. Update the NavBar to correctly login and logout
7. Update the inbox component to show the denied and empty messages
8. Update the preview component to handle remove email

