const redux = require('redux');
const reduxLogger = require('redux-logger');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const combineReducers = redux.combineReducers;

const logger = reduxLogger.createLogger();

// State of the app. Should be an object
const initialCakeState = {
  numOfCakes: 10
}

const initialIceCreamState = {
  numOfIceCreams: 20
}

// Name of the action
const buy_cake = 'buy_cake';
const buy_iceCream = 'buy_iceCream'

// Create an action
// buyCake and buyIceCreme function are action creators that returns an action
function buyCake() {
  return {
    type: buy_cake,
    info: 'Handles buying of cakes'
  }
}

function buyIceCream() {
  return {
    type: buy_iceCream,
    info: 'Handles buying of ice cremes'
  }
}

// Create a reducer
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case buy_cake: return {
      // Return a copy of the state object. Use the spread operator
      ...state,
      // Update only the property that need to be updated
      numOfCakes: state.numOfCakes - 1
    }

    // If there's an action we've not accounted for return the state as it is
    default: return state 
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch(action.type) {
    case buy_iceCream: return {
      ...state,
      numOfIceCreams: state.numOfIceCreams - 1
    }

    default: return state
  }
}

// Use the combineReducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

// Let store handle application state
// Pass applyMiddleware as an arguement to middleware and apply the middleware to the middleware method
const store = createStore(rootReducer, applyMiddleware(logger));

// Access the state
console.log('initial state: ', store.getState());

// Register listner
// const unsubscribe = store.subscribe(() => console.log('Updated state: ', store.getState()));

// Update state
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

// unsubscribe();