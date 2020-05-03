import React from 'react';

const PersonForm = (props) => {
  console.log("props", props)

  return (
  <form onSubmit={props.addPerson}>
      <div>
        name: <input onChange={props.setName} />
      </div>
      <div>number: <input onChange={props.setPhoneNumber}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>)
}

export default PersonForm;

