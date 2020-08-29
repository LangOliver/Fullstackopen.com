import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {sortByVotes, voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteFor(id))
        dispatch(sortByVotes(false))
      }
    
    return (
       <div> 
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
          </div>
    )
}

export default AnecdoteList