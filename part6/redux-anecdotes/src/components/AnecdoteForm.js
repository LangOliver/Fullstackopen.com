import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, sortByVotes } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) =>  {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch(sortByVotes(false))

    }
    
    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote"/>
            <button type="submit">create</button>
      </form>
    )
}

export default AnecdoteForm