# Chapter 5: Hooks

---

## What is a Hook?

> A Hook is a special function that lets you “hook into” React features.

- Store state in functional components
- Apply concepts of lifecycle, props, context, etc.
- In React 16.8 and newer

Notes: In previous versions of React, if you wanted to use state in a component you had to use a class component. With the introduction of hooks, we can now use familiar React concepts such as state, context, props, and lifecycle within functional components. Hooks are fully backwards compatible and peacefully coexist with classes. You project must use version 16.8 or newer of React and its accompanying libraries (`react-dom`, etc).

---

## New Features

- Store state in functional components
- Apply concepts of lifecycle, props, context, etc.
- In React 16.8 and newer

Notes: This new mechanism gives us the power to use state in functional components without classes. Moreover, we still have access to familiar concepts like lifecycle and context. Hooks are fully backwards compatible and peacefully coexist with classes.

---

## Benefits of Hooks

**Share stateful logic without HOCs and render props.**

Notes: Historically, developers would leverage higher order components and render props to share stateful logic throughout apps. With the new tools at our disposal, we can write custom hooks that no longer require these methods. We'll cover this in depth further on in the chapter.

---

## Benefits of Hooks

**Fewer classes.**

Notes: ES6 classes can be confusing for new and experienced developers. Concepts like `this` and `binding` often lead to bugs and confusing code. Moreover, classes are more difficult for compilers to optimize. Hooks limit the need for classes in React. If you're interested in seeing a comparison of compiled code, check out the chapter on components.

---

# Core React Hooks

- `useState`
- `useEffect`

---

## `useState`

- Holds state in a functional component
- Change in state value causes re-render
- Functional component state defined inside the function body
- Analogous to `this.state` in class component

Notes: `useState` is a hook designed to hold state in a functional component (FC). When the state value held by the `useState` hook is changed, the component is re-rendered. As opposed to a React class component where state is defined in the `constructor` or as a static variable, you can define your functional component's state directly within the function body (i.e. the "render" function). `useState` in a FC is analogous to `this.state` in a class component. It supports the same state value types as class components.

---

## A Quick Detour: Array Destructuring

```javascript
const myArray = ['a', 'b', 'c', 'd'];
const [bob, sue, ...rest] = myArray;

console.log(bob); ==> 'a'
console.log(sue); ==> 'b'
console.log(rest); ==> ['c', 'd']
```

Notes: You can assign array literal values to distinct variables. This is based on the variables' positions relative to the values in the array literal. In the above code snippet, `myArray` is initialized to an array of strings with four values. With destructuring assignment, we can assign values to our variables variables `bob`, `sue`, and `rest`. We assign the value at index 0 to `bob`, the value at index 1 to `sue`, and the remaining values with the `...` (spread operator) to `rest`. That means that `bob` and `sue` are strings, whereas `rest` is an array of strings.

---

## A Closer Look at `useState`

```javascript
const [name, setName] = useState("");
```

- Pass initial state value to `useState`
- Return values of `useState`:
  - Current state value
  - Updater function
- Can be named anything you want

Notes: In order to define state in an FC, you might write a line of code like the one written above. Let's break the code down. First, notice that `useState` is a function with only one parameter: the _initial value_ of the state. In this particular case, the initial value is an empty string. `useState` returns a pair of values--the first is the current value of state, and the second is an updater function. Notice how we use destructuring assignment to split up the return values from `useState`.

---

## How to Use `useState`

```javascript
const AButton = () => {
  const [timesClicked, setTimesClicked] = useState(0);
  const plural = timesClicked !== 1;
  const description = plural ? "times" : "time";

  return (
    <button
      type="button"
      onClick={
        () => setTimesClicked(timesClicked + 1)
        // More correct solution:
        // setTimesClicked(currentTimesClicked => currentTimesClicked + 1)
      }
    >
      Clicked {timesClicked} {description}
    </button>
  );
};
```

Notes: In this example, we're using `useState` to track how many times a button is pressed. We update the text on the button depending on the current value of `timesClicked`. When `timesClicked` is updated, the component is re-rendered. When the button is clicked, we use the updater function to increment the `timesClicked` state value by 1. As noted, the more correct solution would be to pass `setTimesClicked` a function to update state. Like in a class component, this approach avoids race conditions between the render method, state updates, and user interactions.

---

## What is a Side-effect?

- Shortened to "effect" from here on out
- An API request
- Manually manipulating DOM
- Subscribing to a JS event
- ...etc

Notes: In class components, we leverage component life-cycle methods like `componentDidMount` to apply "side-effects" to our application. This might mean making an initial data fetch to populate a page during `componentDidMount`. Or subscribing and unsubscribing to a keyboard key press. These events that we're initiating and/or reacting to are called side-effects because they _affect_ components outside of the typical render cycle. Crucially, you can't apply these effects during render for fear of breaking the React update cycle. When writing a functional component, there are no life-cycle methods! So what do we do?

---

## `useEffect`

- Applies side-effects to functional components
- Replaces class life-cycle methods
- By default, runs **after** every render

Notes: Enter stage right: the `useEffect` hook. `useEffect`, as the name implies, is a hook that gives you the power to apply side-effects to your functional component **without interrupting the component's render method**. It takes the place of all the class life-cycle methods, but shouldn't be considered a life-cycle method itself. By default, `useEffect` will execute its provided function after every render. However, you can customize when and how it runs. We'll take a look at a few examples.

---

## `useEffect`: API

```javascript
useEffect(
  /* argument 1: the effect + optional cleanup */
  () => {
    // the effect function body
    // e.g. console.log("hello");

    // the clean up function
    return () => {};
  },
  /* argument 2: the dependencies array */
  [
    /* dependency 1, dependency 2, ... */
  ]
);
```

Notes: Let's briefly talk about the API. We will run through multiple examples to clarify how to use this hook properly. `useEffect` takes two arguments. The first is a function that will be executed when the effect is "triggered". The second is an optional array that helps React determine when the effect is triggered. If the second argument is omitted, then the effect will run after every render. If the second argument is populated, then a shallow compare is run across all of the elements in the array. If any of the element's values have changed since the last render, then the effect is triggered. Finally, you can return a function from your effect. This can be used to clean up after whatever effect you have applied.

---

## `useEffect`: No Dependencies Array

```javascript
const AKeyboard = () => {
  useEffect(() => {
    const onKeyPress = e => {
      console.log(`You have tapped ${e.code}.`);
    };

    document.addEventListener("keypress", onKeypress);

    return () => document.removeEventListener("keypress", onKeypress);
  });

  return <>....</>;
};
```

Notes: We have omitted the second argument--a.k.a. the dependencies array--in this example of `useEffect`. After every render of `AKeyboard`, our code will run the effect and clean up after itself. Specifically, we will subscribe to the `keypress` event after every render and unsubscribe to the `keypress` event afterwards. This doesn't seem particularly efficient. Let's make it better.

---

## `useEffect`: Empty Dependencies Array

```javascript
const AKeyboard = () => {
  useEffect(
    () => {
      const onKeypress = e => {
        console.log(`You have tapped ${e.code}.`);
      };

      document.addEventListener("keypress", onKeypress);

      return () => document.removeEventListener("keypress", onKeypress);
    },
    /* Here's the difference! */
    []
  );

  return <>....</>;
};
```

Notes: There isn't anything gained by subscribing and unsubscribing after every render. We want to achieve something like subscribing once in `componentDidMount` and unsubscribing once in `componentWillUnmount`. It turns out very little code needs to change to achieve that behavior. If we pass an empty array `[]` as the second argument to `useEffect`, we get that exact behavior! In short, we're telling React that it should only apply the effect (i.e. subscribe to `keypress`) whenever the values in the dependencies array have changed. Our dependencies array is empty so the values can never change. Thus, our effect is only applied after the first render. Likewise, our clean-up function is only executed whenever the component is going to be unmounted.

---

## `useEffect`: Dependencies

```javascript
const DroidComponent = ({ droidPurpose = "toServe" }) => {
  const [droidId, setDroidId] = useState("R2-DEEE2");

  useEffect(() => {
    console.log(droidId);
    console.log(droidPurpose);
  }, [droidId, droidPurpose]);

  return <>....</>;
};
```

Notes: To understand what goes in the dependencies array, we need to see what dynamic values are used inside the effect. `droidId` and `droidPurpose` are both values that could change and are used in the effect. They need to go in the dependencies array. We don't need to include variables whose values would never change or variables which aren't used in the effect. `droidId` and `droidPurpose` will be both be logged to the console any time `droidId` **or** `droidPurpose` change.

---

## `useEffect`: Async Effects

```javascript
const DroidComponent = ({ droidPurpose = "toServe" }) => {
  const [droidId, setDroidId] = useState("R2-DEEE2");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const registerPurpose = async (id, purpose) => {
      try {
        setLoading(true);
        // assume that DroidAPI is defined elsewhere in the project
        await DroidAPI.registerPurpose(id, purpose);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    registerPurpose(droidId, droidPurpose);
  }, [droidId, droidPurpose]);

  return <>....</>;
};
```

Notes: Expanding on the previous code, this new snippet shows how to use asynchronous functions as effects. Setter functions returned from `useState` are guaranteed to have stable identity (i.e. no change in reference value), so there is no need to add it to the dep. array. We don't need to include `DroidAPI` because it's a static import, which indicates that its value would never change. As for `async` functions, React doesn't allow for `useEffect` to directly accept an asynchronous function. Instead we use closure and a local asynchronous function to achieve similar means. Whenever `droidId` **or** `droidPurpose` are updated, the current value of `droidId` and `droidPurpose` are registered via the `DroidAPI`.

---

## `useEffect`: Before

```javascript
class AKeyboard extends Components {
  state = {
    code: null
  }

  componentDidMount() {
    document.addEventListener('keypress', this.onKeypress)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onKeypress)
  }

  onKeypress = (e) => {
    console.log("Tapped", e.code);
    this.setState({code: e.code});
  }

  render() {
    ...
  }
}
```

Notes: Another advantage of using hooks is the logical grouping of similar code. Take for instance the above class component. To understand what is happening on a keypress, you need to look in three different places within the class. Now imagine this wasn't a contrived example and how much more code would be muddying the waters! You might have another couple API calls in `componentDidMount` and `componentDidUnmount`, plus more logic and statement in `onKeypress`. It could very quickly become difficult to see how the code should operate. Not to mention how easy it is to forget to call `removeEventListener`. How can `useEffect` help in this case?

---

## `useEffect`: After

```javascript
const AKeyboard = () => {
  const [code, setCode] = useState(null);

  useEffect(() => {
    const onKeypress = e => {
      console.log("Tapped", e.code);
      setCode(e.code);
    };

    document.addEventListener("keypress", onKeypress);

    return () => {
      document.removeEventListener("keypress", onKeypress);
    };
  }, []);

  return <>....</>;
};
```

Notes: There it is! All of the code related to the `keypress` event is contained in a single `useEffect` hook. It's incredibly legible code that groups together related logic. This code behaves identically to the previous class component.

---

# Exercise 1.0

Convert the AppProvider to use `useState` and `useEffect`.

---

## `useContext`

- Subscribes functional component to changes in context `value`
- Must have `Provider` mounted somewhere above in the component tree

Notes: The `useContext` hook is the way to tap into a context in a functional component without using a Higher Order Component. The hook returns the current `value` of the context and will re-render your component whenever that `value` changes. Like the other context API, you must have a context `Provider` mounted above your FC in the component tree. The `useContext` hook only reads the current `value`. It does not write to the context.

---

## `useContext`: Before with `static contextType`

```javascript
/* imagine that the provider is already mounted in the tree above this component */

class DroidRepair extends Component {
  static contextType = DroidContext;

  render() {
    const {
      /* values set on DroidContext.Provider */
      damageDatabase
    } = this.context;

    const repairInstructions = damageDatabase[droidId];

    return <>....</>;
  }
}
```

Notes: The `DroidRepair` component subscribes to changes in the `DroidContext`. When the `damageDatabase` value within the context provider changes, `repairInstructions` will reflect that change.

---

## `useContext` After with Hook

```javascript
/* imagine that the provider is already mounted in the tree above this component */

const DroidRepair = ({ droidId }) => {
  const {
    /* values set on DroidContext.Provider */
    damageDatabase
  } = useContext(DroidContext);

  const repairInstructions = damageDatabase[droidId];

  return <>....</>;
};
```

Notes: This component operates in the exact same manner as the `static contextType` version. Importantly, you can use the context API from a functional component.

---

# Exercise 2.0

Convert the `Inbox`, `Preview`, and `NavBar` components to use `useContext`.

---

## `useCallback`

- Referential equality of props
- Memoize a callback
- Function reference doesn't change until necessary

Notes: If you define a method within the scope of a functional component without using the `useCallback` hook, the reference of the inner function will change on every render. Not only can this be a poor use of system memory, but it will also cause unnecessary renders of child components that take the inner function as a prop. `useCallback` memoizes functions to avoid those problems. In other words, the reference to the inner function wouldn't change until necessary. How do we define necessary?

---

## `useCallback`: API

```javascript
const memoizedCallback = useCallback(
  myArg => {
    const calculation = aPropVariable * myArg - aStateVariable;
    /* will `anotherStateVariable` ever update? */
    return anotherStateVariable / calculation;
  },
  [aPropVariable, aStateVariable]
);

memoizedCallback(10);
```

- Dependencies in dep. array are not direct arguments to the callback
- Beware stale references within callback closure

Notes: Here's our first look at `useCallback`. The first argument is the callback function that we want to memoize. The second (optional) argument is the dependencies array that determines when the callback needs to be updated. While dependencies in the array are not direct arguments to the callback, they can act like function arguments. Any state or prop variable used in the callback should be included in the dependencies array if you want that value to stay up to date. In this example, `anotherStateVariable` will never change from its initial value because of function closure. On the other hand, if `aPropVariable` or `aStateVariable` ever change value then `memoizedCallback` will receive a new function reference.

---

## `useCallback`: Saving Renders

```javascript
const DroidProduction = ({ assemblyLine, currentTime }) => {
  const { toolChest } = useContext(DroidContext);
  const [productionScheme, setProductionScheme] = React.useState("BB-8");

  const memoizedAssemble = useCallback(() => {
    assemblyLine.assemble(productionScheme, toolChest);
  }, [assemblyLine, productionScheme, toolChest]);

  return (
    <>
      <Assembler assemble={memoizedAssemble} />
    </>
  );
};
```

Notes: Imagine the `Assembler` component uses its prop `assemble` to render a droid, and that `assemble` is a resource-intensive operation. We want to avoid unnecessarily assembling droids. Since `Assembler` uses referential equality to determine when it should render a droid, we need to sparingly update the `assemble` prop. We can do that with `useCallback`. `memoizedAssemble` only receives a new value whenever one of its 3 dependencies are updated. Even if `DroidProduction` receives a new value of `currentTime` 100 times per second, the `memoizedAssemble` callback reference will remain the same if its dependencies remain steady.

---

## `useMemo`

- Memoizes a **value**
- Similar to `useCallback`
  - `useCallback` returns a memoized function
  - `useMemo` returns a memoized function **result** or value

Notes: `useMemo` is a handy tool for optimizing your components. In the way that `useCallback` can return the same function reference for the same dependency array, `useMemo` will not recompute its value until its dependencies have changed. Whatever code is evaluated by `useMemo` will be run during render, so it's important to only use this hook for render-critical calculations. Any value that isn't render-critical should be computed via `useEffect`. This prevents lagging during the render cycle.

---

## `useMemo`: API

```javascript
const ForceSensitiveBeing = ({
  lightsaberAttributes: { color, crystalType, doubleSided },
  darkSide
}) => {
  const lightsaber = useMemo(
    () => constructLightsaber(color, crystalType, doubleSided),
    [color, crystalType, doubleSided]
  );

  return (
    <>
      <Force darkSide={darkSide} />
      <Weapon weapon={lightsaber} />
    </>
  );
};
```

Notes: `useMemo` takes two parameters: a "create" function and an array of dependencies. Whenever a value in the dependencies array is updated, the the create function is reevaluated. Since a lightsaber is time intensive to construct and we need that value in order to render a `Weapon`, `useMemo` is a good choice for us. Our `ForceSensitiveBeing` component will only recompute the `lightsaber` value when `color`, `crystalType`, or `doubleSided` change.

---

## `useMemo` and Contexts

```javascript
const YodaProvider = () => {
  // assume these two functions are properly memoized.
  const trainYounglings = ....;
  const ponder = ....;

  const value1 = {
    trainYounglings,
    ponder
  };

  // VERSUS

  const value2 = useMemo(
    () => ({
      trainYounglings,
      ponder
    }),
    [trainYounglings, ponder]
  );

  return <YodaContext.Provider value={value2} />;
};
```

Notes: Another cool application of `useMemo` is to prevent your context provider `value` from causing re-renders in components that are subscribed to the context. What is the key difference between the two definitions of `value` above? The `value2` is memoized! Recognized that the reference to `value1` will changed on every render. That means that any component that is relying on the context value will re-render after the context has re-rendered. Why? Because a shallow compare between objects created on different renders will indicate that the references has changed, and thus the child components must also re-render. `value2` avoids this problem because its object reference will only differ whenever our `trainYounglings` or `ponder` functions have new references. Again, we're assuming that those two functions are memoized correctly as well.

---

# Exercises

### 3.0

Separate auth and email logic into their own context provider components.

### 4.0

Implement `useCallback` and `useMemo` for:

- isAuthenticated
- emails
- login
- logout
- removeEmail

---

## `useRef`

- Object that can store any mutable value
- Persists between renders
- Does not cause re-renders

Notes: `useRef` might look familiar. In class components, refs are used to access the DOM. However, this hook can be applied in a host of manners beyond DOM access. `useRef` returns an object that can store any mutable value on its `.current` property. The ref object persists between renders, and its reference value is the same every time. It doesn't cause re-renders either. A ref object is equivalent in functionality to a class instance property. React doesn't update when the class component instance property changes, and the same is true for refs in a functional component.

---

## `useRef`: API

```javascript
const SuperSuit = () => {
  const [suitLocation, setSuitLocation] = useState("Why do you need to know?");
  const previousSuitLocation = useRef(suitLocation);

  useEffect(() => {
    previousSuitLocation.current = suitLocation;
  }, [suitLocation]);

  const updateSuitLocation = useCallback(
    newLocation => setSuitLocation(newLocation),
    []
  );

  return (
    <FrozoneSuit
      currentLocation={suitLocation}
      previousLocation={previousSuitLocation}
      updateLocation={updateSuitLocation}
    />
  );
};
```

Notes: `useRef` gives us flexibility in how we use refs. `.current` can hold any arbitrary value without causing a re-render. For instance, we can store a previous value of state into a ref. In the example, Frozone is having trouble finding his super suit. We upgraded his suit to automatically track where he previously stashed it. Any time that `suitLocation` is updated, our effect will write the previous value to `previousSuitLocation.current`. Remember that effects are applied **after** a render. Therefore, `previousSuitLocation.current` will hold the value from the preceding render.

---

## `useReducer`

- Alternative to `useState`
- Better suited for complex and/or nested state
- Also ideal for situations where new depends on old state

Notes: The word "reducer" might sound familiar if you have done any work with Redux, a third party state-management library. A reducer is a function that takes arguments like "previous state" and "actions" and from those produces new state. Similarly, `useReducer` can be wielded in functional components to manage state whenever `useState` doesn't cut the mustard. You might find that you have a lot of interrelated state variables that change under the same circumstances. Or you might encounter a situation when you need the new state to be a transformation of the old state. This is when you should consider reaching for `useReducer`.

---

## Reducers

`(state, action) => newState`

Notes: A reducer is a function of the (current) `state` and an `action`. The state can be anything but is most typically an object or an array. Remember that `useReducer` is best utilized when your state has grown too complex for `useState`. An action, again, can be anything. A well-accepted standard is that every action should be an object with at least one string-valued field called `type` and another optional field called `payload`. When the reducer is executed with `state` and `action`, it produces the next state based on the contents of `state` and `action`. The next state should have the same shape as the previous state. We'll see an example below, but this slide should induce deja vu if you're a Redux veteran.

---

## `useReducer`: Initial State Part 1

`const [state, dispatch] = useReducer(reducer, initialState);`

Notes: You can initialize state in one of two ways. The first way requires two arguments to `useReducer`: 1st the `reducer` function, second the `initialState` value. This is the simplest approach. Please note that you **should not** initialize reducer state by using a default parameter value in your reducer function, e.g. `(state = initialState, action) => newState`. This is one way that `useReducer` differs from Redux.

---

## `useReducer`: Initial State Part 2

`const [state, dispatch] = useReducer(reducer, initialArg, init);`

Notes: The second way to create a reducer's initial state is by passing three arguments to `useReducer`. First, the `reducer` function. Second, an initial _argument_. And third, a lazily execute initialization function. When React is ready to build the first state value for your reducer, it will execute the third argument (`init`) with the second argument (`initialArg`); `init(initialArg)`. If you have an action that should reset your state, you might choose this approach in order to share code between your reducer and your `init` function.

---

## `useReducer`:

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case "viceroyGunray":
      return { count: state.count + 1 };
    case "darthMaul":
      const newCount = state.count === 0 ? state.count : state.count - 1;
      return { count: newCount };
    case "order66":
      return { count: 0 };
    default:
      return state;
  }
};

const Jedi = ({ count = 1 }) => {
  const [state, dispatch] = useReducer(reducer, {
    count
  });

  return (
    <>
      <h2>There are {state.count} Jedi</h2>
      <button onClick={() => dispatch({ type: "viceroyGunray" })}>
        This is getting out of hand!
      </button>
      <button onClick={() => dispatch({ type: "darthMaul" })}>
        🎵 Duel of the Fates 🎵
      </button>
      <button onClick={() => dispatch({ type: "order66" })}>
        I am the Senate.
      </button>
    </>
  );
};
```

Notes: This is a common example of how you can use `useReducer` to maintain state. We use the `dispatch` function returned by `useReducer` to directly dispatch actions to the reducer. Based on the `type` of action, we return new state. Remember that you should never mutate current state; either return unmodified state or new state.

---

# Additional React Hooks

- `useImperativeHandle`
- `useLayoutEffect`
- `useDebugValue`

Notes: Check out this url for the entire API reference for React hooks: https://reactjs.org/docs/hooks-reference.html.

---

# Custom Hooks

- Share logic across multiple components using built-in hooks
- State and effects are not shared between uses of the same hook
- Name hook starting with `use`, e.g. `useState`

Notes: Custom hooks are a new way to extract stateful logic into reusable, composable functions. The most common example is subscribing to a stream of updates. Originally you could achieve similar behavior with HOCs and render props at the expense of unnecessary component nesting and updates. Each use of a custom hook maintains independent state and effects, so you can use your custom hook simultaneously in as many components as you like. It is _strongly encouraged_ React convention that your hook starts with `use` and uses camel case. The React hooks ESLint plugin relies on your following the convention.

---

## Use Case

_The Mark of Rohan and his army of Rohirrim must know when the Beacons of Gondor are lit._

Notes: Imagine there is an IOT service that your app can subscribe to. It will notify you to changes in the status of the Beacons of Gondor--are they lit or not? In order to preserve resources for the war against the armies of Mordor, you need to write DRY code.

---

```javascript
const useBeaconsAreLit = () => {
  const [areLit, setAreLit] = useState(false);

  useEffect(() => {
    const updateBeaconStatus = newStatus => {
      setAreLit(newStatus.lit);
    };

    GondorIOT.subscribeToBeacons(updateBeaconStatus);
    return () => GondorIOT.unsubscribeToBeacons(updateBeaconStatus);
  }, []);

  return areLit;
};
```

Notes: This is a custom hook. Via `useEffect`, it encapsulates the logic of subscribing and unsubscribing to our `GondorIOT` service. Our custom hook returns a boolean that describes whether or not the beacons are lit. Custom hooks combine built-in React hooks and other custom hooks to package together reusable logic.

---

```javascript
const Rohirrim = ({ recruits }) => {
  const areBeaconsLit = useBeaconsAreLit();
  return recruits.map(recruit => (
    <Recruit rideToGondor={areBeaconsLit} recruit={recruit} key={recruit.id} />
  ));
};

const Théoden = () => {
  const areBeaconsLit = useBeaconsAreLit();
  return <MarkOfRohan isMad={areBeaconsLit} />;
};
```

Notes: Instead of duplicating the `GondorIOT` subscription logic in multiple components (or using HOC patterns), we call `useBeaconsAreLit`. The boolean return value of our hook is used to conditionally render the UI. When we receive a new status from `GondorIOT`, the status is propagated to our components so that they update as well. Our code is DRY and exceptionally read-able!

---

# Exercise 5.0

Expose a custom hook for `useAuth` and `useEmail`. Consume these custom hooks instead of using `useContext`.

---

# Tips, Tricks, and Gotchas

---

## Rules of Hooks

1. "Only call Hooks at the top level."
2. "Only call Hooks from React function components."

---

## Top Level

#### Don't call inside:

- loops
- conditions
- nested functions

**Put hooks at top of functional components.**

Notes: React uses the order of hooks execution to associate state with each hook. If you change the order of execution of your hooks in a component, React can't keep track of which hook has updated.

---

## Top Level - Conditional Execution

**NO** 🛑

```javascript
if (doTheThing) {
  useEffect(() => {
    ...
  }, []);
}
```

**YES** ✅

```javascript
useEffect(() => {
  if (doTheThing) {
    ...
  }
}, [doTheThing])
```

Notes: If you need to conditionally execute logic as an effect, put the conditional _inside_ `useEffect`. Be sure to include the variables used to calculate the conditional in your dependencies array.

---

## Only from React Functions

**Not compatible with regular JS functions (or React classes).**

Works with:

- Functional components
- Custom hooks

Notes: Hooks are a special feature of React, and they will not work if separated from the React framework. Every hook must be traceable back to functional component source code. For example, you cannot use a hook in an API module that is not rendered as a component.

---

## ESLint Helper

- https://www.npmjs.com/package/eslint-plugin-react-hooks#installation
- https://reactjs.org/docs/hooks-rules.html#eslint-plugin

Notes: There is a React-sponsored linter that will enforce the two rules we just covered. It is highly recommended to integrate the linter into your IDE/workflow of choice!

---

## Stale Values

```javascript
const Olivanders = ({ wandType, wizard }) => {
  useEffect(() => {
    chooseWizard(wandType, wizard);
  }, [wizard]);

  return <>....</>;
};
```

Notes: One of the "gotchas" of hooks is how easy it is to accidentally use stale variable values. When the function provided to `useEffect` is initially created, it "closes" over the values present at that time. Because `wandType` isn't included in the dependencies array, the `wandType` value inside the function will only ever hold the initial prop value. In subsequent renders, the `wandType` prop value may change but the effect will never know that. A good rule of thumb is to include all mutable variables used inside the effect as part of the dependencies array of `useEffect`.

---

## Infinite Render Loops

```javascript
const RedShirt = () => {
  const [stun, setStun] = useState(false);
  return <Phaser stun={stun} setStun={setStun} />;
};

const Phaser = ({ stun, setStun }) => {
  useEffect(() => {
    setStun(!stun);
  }, [stun]);

  return <>....</>;
};
```

Notes: While it likely won't be this straightforward to debug, you might encounter situations where your effects updates state that the effect itself depends on. For instance, `useEffect` has `stun` in the dependencies array. But it also updates `stun` from within the effect. The code will cause a nauseating loop of updates that will eventually end with a crash.

---

# Final Exercise

---

## 6.0

Update `useEmail` to manage state with `useReducer`.

---

## 7

Add state and actions to `useEmail` in order to support reverting the most recent email removal. For instance, you might need to save the deleted email and its old index in the list of previews. And you'll need to expose a new function on the context that will allow the inbox to undo a removal.

---

## 8

Implement the `Undo` component. It should be:

- `div` with class name of `undo`
  - `button` with class name of `undo-button`
    - `h3` with class name of `undo-title`
    - `img` with source of the `undo.png` icon and class name of `undo-image`

When the button is clicked, it should undo the most recent email removal.

---

## 9

Render the `Undo` component in the inbox at the same index as the most recently removed email. Removing another email will render the `Undo` component at a new index (at the index of the most recently removed email).
