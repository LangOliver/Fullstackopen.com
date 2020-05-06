import React from 'react';
import Person from './Person'
import ListGroup from 'react-bootstrap/ListGroup'

const Persons = (props) => {

  return (
    <ListGroup>
    {props.personsToShow.map(person => 
      <Person key={person.id} person={person} personsToShow={props.personsToShow}></Person>
      )
      }

  </ListGroup>
  )
}

export default Persons;






