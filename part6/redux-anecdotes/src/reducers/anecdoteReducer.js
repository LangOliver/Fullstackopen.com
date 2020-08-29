
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
const reducer = (state = initialState, action) => {

  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE_INCREMENT':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      console.log('I\'m the one who should now increment the vote of:', action.data)
      return  state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    case 'NEW_ANECDOTE':
      const newAnecdote = {
        content: action.data,
        id: getId(),
        votes: 0 
      }
      return state.concat(newAnecdote)
    case 'SORT_ANECDOTES_ASC':
      return state.slice().sort(function(a, b) {
        return a.votes - b.votes;
     })
    case 'SORT_ANECDOTES_DSC':
      return state.slice().sort(function(a, b) {
        return b.votes - a.votes;
     })    
    default: return state
  }
}
export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content,
    id: getId(),
    votes: 0 
  }
}
export const voteFor = (id) => {
  return {
    type: 'VOTE_INCREMENT',
    data: {id}
  }
}
/**
 * Order the Anecdotes by votes
 * @param {Sort Ascending if true, descending if false} ascending 
 */
export const sortByVotes = (ascending) => {
  if (ascending) return  {type:'SORT_ANECDOTES_ASC'}
  return {
    type: 'SORT_ANECDOTES_DSC'
  }
  
}



export default reducer