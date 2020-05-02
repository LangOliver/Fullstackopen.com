import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  // set State for votes, by binding useState to an empty array filling it with 0's
  const [anectodesVotes, setAnectodesVotes] = 
  useState(Array(props.anecdotes.length).fill(0))
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState("")

  /* handler for updating the state with a new random anecdote based
  on a random number between 0 and the length of the array -1
  */
  const handleSpinTheWHeel = () => {
    let min =0;
    /* Must be full length of array not length-1 because the
    Math.floor function brings down the number e.g. from 5.9 to 5
    */
    let max = Math.floor(anecdotes.length);
    let randomAnectodePosition =  
    Math.floor(Math.random() * (max - min)) + min
     console.log("random number", randomAnectodePosition, "maximum is ",max)
    setSelected(randomAnectodePosition)
  }
  /* handler for the voting system updates the state of the votes, and the
  anecdote of the day
  */
  const voteAnectode = () => {
    // Copy old votes array and vote for the selected anecdote
    const copy = [...anectodesVotes]
    copy[selected] = copy[selected]+1
    console.log("copied array after vote:", copy)

    // change state of votes, this should re-render the application
    setAnectodesVotes(copy)
    console.log("voted for anectode nr ", selected, "vote count is now",
    copy[selected])

    // find the array position of the anecdote with the most votes
    var indexOfMaxValue = copy.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    
    // change the anecdote of the day to the anecdote with the most votes this should re-render the application
    console.log("found a winner it is in array position: ", indexOfMaxValue, "it's ", props.anecdotes[indexOfMaxValue])
    setMostVotedAnecdote(props.anecdotes[indexOfMaxValue])
  }


  //console.log("votes array length: ", anectodesVotes.length)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <hr></hr>
      <p>
          <button onClick={handleSpinTheWHeel}>Spin the wheel</button>
          <button onClick={voteAnectode}>Vote as your favorite anecdote</button>  
        </p>
        {props.anecdotes[selected]}
        <p>
          has {anectodesVotes[selected]} votes
        </p>
        
        <hr></hr>
        <b>Anecdote with most votes</b>
        <p> {mostVotedAnecdote}</p>

        <p>

        </p>
      </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)