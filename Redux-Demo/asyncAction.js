const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunk = require('redux-thunk').default;
const axios = require('axios');

// Declare the state
const initialState = {
  loading: false,
  users: [],
  error: ''
}

// Actions
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'

// Action creators
const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST
  }
}

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users
  }
}

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error
  }
}

// Reducer
const reducer = (state=initialState, action) => {
  switch(action.type) {
    case FETCH_USER_REQUEST: 
      return {
        ...state,
        loading: true
      }
    
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }

    case FETCH_USER_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      }

    default:
      return state
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    // Sets loading to true
    dispatch(fetchUserRequest());
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const users = response?.data
          dispatch(fetchUserSuccess(users));
      })
      .catch(error => {
        dispatch(fetchUserFailure(error.message));
      })
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

// Subscribe to store
store.subscribe(() => {
  console.log(store.getState())
})

// Dispatch async action
store.dispatch(fetchUsers());