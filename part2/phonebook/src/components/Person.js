import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import PhoneBookDataService from './../services/PhonebookDataService';
import ChangeNumberModal from './ChangeNumberModal';

class Person extends React.Component {
    
    constructor(props) {
        super(props);
       
    }

    handleDelete(id, persons, setPersons) {
        PhoneBookDataService.deleteIt(id)
        .then(response => {
            setPersons(persons.filter(person =>
                person.id !== id))
      })}
    
    render () {
        return (
            <ListGroup.Item>
                {this.props.person.name} {this.props.person.number} 
                <Button 
                    variant="outline-danger"
                    className="delete-btn"
                    onClick={e => this.handleDelete(this.props.person.id,
                     this.props.persons, 
                     this.props.setPersons)}>
                    X
                </Button>{' '}
            </ListGroup.Item>
    ) 
    }

}

export default Person;


