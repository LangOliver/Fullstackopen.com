import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, sortByVotes } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) =>  {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log('I call the dispatcher with content: ',content)
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
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