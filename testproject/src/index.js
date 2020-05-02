import React, { useState } from 'react'
import ReactDOM from 'react-dom'
/* Review event handler example
*/

const App = (props) => {
  const [value, setValue] = useState(10)
  const handleClick = () => {
  console.log('clicked the button')
    setValue(value*2)
}
  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
  button
    </div>
  )
}

ReactDOM.render(
<App />, 
document.getElementById('root')
)