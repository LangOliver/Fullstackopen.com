import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {sortByVotes, voteFor } from '../reducers/anecdoteReducer'
import {setVoteNotification, resetVoteNotification} from '../reducers/notificationReducer'
const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({filter, anecdotes}) => { 
            return filter === 'ALL' ? anecdotes : anecdotes.filter(anecdote => anecdote.content.includes(filter))})
  
    const vote = (anecdote, id) => {
        dispatch(voteFor(anecdote, id))
        dispatch(sortByVotes(false))
        dispatch(setVoteNotification(anecdote.content))
        setTimeout(() => {
            dispatch(resetVoteNotification())
        }, 5000)
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
            <button onClick={() => vote(anecdote, anecdote.id)}>vote</button>
            </div>
        </div>
        )}
          </div>
    )
}

export default AnecdoteList