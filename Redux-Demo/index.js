const buy_cake = 'buy_cake';

// Create an action
// buyCake function is an action creator that returns an action
function buyCake() {
  return {
    type: buy_cake,
    info: 'First redux action'
  }
}