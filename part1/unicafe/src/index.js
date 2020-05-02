import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeeback = (count, setCount) => {
    setCount(count+1)
  }

  const average = () => {
    return ((good+neutral+bad)/3)
  }
  const positive = () => {
    let positive = (good/(good+neutral+bad))*100
    console.log("Positive is calculated to: ", positive)

    return positive
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <div> 
        <button onClick={() => setGood(good+1)}>good</button>
        <button onClick={() => setNeutral(neutral+1)}>neutral</button>
        <button onClick={() => setBad(bad+1)}>bad</button>
      </div>
      
      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {good + neutral + bad}</p>
      <p>average: {average()}</p>
      <p>positive: {positive()} % </p>
      

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)