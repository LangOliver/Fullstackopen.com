import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {sortByVotes, voteFor} from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state )
  const dispatch = useDispatch()


  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
    dispatch(sortByVotes(false))

  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <AnecdoteForm></AnecdoteForm> 
    </div>
  )
}

export default App