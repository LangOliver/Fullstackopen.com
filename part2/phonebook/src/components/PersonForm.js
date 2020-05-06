import React from 'react';
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Filter from './Filter';

const PersonForm = (props) => {
  console.log("props", props)

  return (
    <div>
      <Container>
        <Row>
          <Col sm={8}>  
            <Form onSubmit={props.addPerson} >
              <Form.Group controlID="PhoneBookForm">
                <Form.Row >
                  <Col>
                  <Form.Control placeholder="First name"onChange={props.setName} />
                </Col>
                <Col>
                  <Form.Control placeholder="Number" onChange={props.setPhoneNumber}/>
                </Col>
                <Col>
                  <Button variant="secondary"  type="submit" >add</Button>
                </Col>
                </Form.Row>
                <Form.Row>
                  <Filter changeFilter ={props.changeFilter}></Filter>
                </Form.Row>
              </Form.Group>  
            </Form>

            </Col>
          <Col sm={4}></Col>
        </Row>
  </Container>
    
      
    </div>
   )
}

export default PersonForm;

