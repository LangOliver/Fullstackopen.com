import React from 'react';
import Person from './Person'
import ListGroup from 'react-bootstrap/ListGroup'

class Persons extends React.Component {

  constructor(props) {
    super(props);
}

  render() {

    return (
      <ListGroup>
        {this.props.persons.map(person => 
        <Person 
          key={person.id} 
          person={person} 
          persons={this.props.persons}
          setPersons={this.props.setPersons}>
        </Person>
      )}

  </ListGroup>
    )
    
  }
}

export default Persons;






