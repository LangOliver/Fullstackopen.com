import React from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import PhoneBookDataService from './../services/PhonebookDataService';

const Person = (props) => {
    const person = props.person;

    const handleDelete = (id) => {
        console.log('Deleting with id',id)
        PhoneBookDataService.deleteIt(id)
        .then(response => {
  
      })
    }

    return (
                    <ListGroup.Item 
                        key={person.id}>
                        {person.name} 
                        {person.number} 
                        <Button 
                            variant="outline-danger"
                            className="delete-btn"
                            onClick={e => handleDelete(props.person.id)}>
                            X
                        </Button>{' '}

                    
                    </ListGroup.Item>
               
        
       
    )
}

export default Person;


