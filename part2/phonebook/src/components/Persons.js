import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

const Persons = (props) => {

  return (
    
    <ListGroup>
    {props.personsToShow.map(person => 
      <ListGroup.Item key={person.id}>{person.name} {person.number}</ListGroup.Item>)}
  </ListGroup>
  )
}

export default Persons;






