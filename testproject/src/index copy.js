/* Event handler and state hook example
*/
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [ counter, setCounter ] = useState(0)
  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)

 
  return (
    <div>
      <Display counter={counter}/>
      <Button handleClick={increaseByOne} text="+1"/>
      <Button handleClick={setToZero} text="Reset"/> 
        
    </div>
  )
}
const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
/* Display = ({counter}) is destructured form of (props.counter)
which creates the variable counter and passes on the first props attribute
as reference */
const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)