
const notificationsAtStart = 
    ''
  
  const notificationReducer = (state = notificationsAtStart, action) => {
  
    console.log('state now: ', state)
    console.log('action', action)
  
    switch(action.type) {
        case 'SET_VOTE_MESSAGE':
            return 'voted for: ' + action.data
        case 'RESET':
            return notificationsAtStart
    default: return state
    }
  }


  export const setNotification = (notificationText, timeToDisplay) =>  {
    return dispatch => {
      dispatch(setVoteNotification(notificationText))
      
      setTimeout(() => {
        dispatch(resetVoteNotification())
      }, timeToDisplay)
  } 
}


  export const setVoteNotification = (anecdoteText) => {
    return {
      type: 'SET_VOTE_MESSAGE',
      data: anecdoteText
    }
  }

  export const resetVoteNotification = () => {
    return {
      type: 'RESET'
    }
  }
  export default notificationReducer