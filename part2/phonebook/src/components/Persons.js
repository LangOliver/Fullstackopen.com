import React from 'react';

const Persons = (props) => {

  return (
    <ul>
    {props.personsToShow.map(person => 
      <li key={person.id}>{person.name} {person.number}</li>)}
  </ul>
  )
}

export default Persons;






