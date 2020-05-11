import React from 'react';
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Filter from './Filter';
import ChangeNumberModal from './ChangeNumberModal';

const PersonForm = (props) => {

  return (
    <div>
      <Container>
            <Form onSubmit={props.addPerson} >
              <Form.Group controlId="PhoneBookForm">
                  <Form.Control placeholder="First name" 
                  onChange={e => props.setNewName(e.target.value)}
                  value={props.newName}
                   />
                  <Form.Control placeholder="Number" 
                  onChange={e => props.setNewPhoneNumber(e.target.value)}
                  value={props.newPhoneNumber} 
                  />
                  <Button variant="secondary"  type="submit" >add</Button>
              </Form.Group>  
            </Form>
            <Form>
              <Form.Row>
                <Filter changeFilter ={props.changeFilter}></Filter>
              </Form.Row>
            </Form>
 
    </Container>
    
    </div>
   )
}

export default PersonForm;

