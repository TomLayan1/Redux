// State of the app. Should be an object
const initialState = {
  numOfCakes: 10
}

// Name of the action
const buy_cake = 'buy_cake';

// Create an action
// buyCake function is an action creator that returns an action
function buyCake() {
  return {
    type: buy_cake,
    info: 'First redux action'
  }
}

// Create a reducer
const reducer = (state = initialState, action) => {
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