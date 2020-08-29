
const filterAtStart = 'ALL'
  
  const filterReducer = (state = filterAtStart, action) => {
  
    console.log('state now: ', state)
    console.log('action', action)
  
    switch(action.type) {
        case 'SET_FILTER':
            return action.filter
        case 'RESET':
            return filterAtStart
    default: return state
    }
  }
  
  export const setFilter = (newFilter) => {
    return {
      type: 'SET_FILTER',
      filter: newFilter
    }
  }

  export const resetVoteNotification = () => {
    return {
      type: 'RESET'
    }
  }
  export default filterReducer