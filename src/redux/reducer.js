const { SET_REQUIREMENTS, SET_RESUME } = require('./constants')
const { initialState } = require('./initial_state')

const reducer = (state=initialState, action) => {
  switch(action.type){
    case SET_REQUIREMENTS:
      return {
        ...state,
        "requirements_loaded": action.payload
      }
    case SET_RESUME:
      return {
        ...state,
        'resume_loaded': action.payload
      }
    default:
      return state
  }
}

module.exports = {
  reducer
}
// console.log(initialState)
// console.log(reducer(initialState, {type: 'SET_REQUIREMENTS', payload: true}))
// console.log(reducer(initialState, {type: 'SET_RESUME', payload: true}))