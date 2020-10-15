import { createStore, combineReducers } from 'redux'
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteService from './services/anecdotes'


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer

})

const store = createStore(reducer,
    composeWithDevTools())
    anecdoteService.getAll().then(anecdotes =>
        store.dispatch(initializeAnecdotes(anecdotes)))

export default store
  