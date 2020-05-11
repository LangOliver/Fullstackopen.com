import React,  { useState } from 'react';
import Button  from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';


const ChangeNumberModal = (props) => {
  
    return (
      <Modal show = {props.show} 
      onHide= {props.closeConfirmChangeModal} >
      <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Update Number</Modal.Title>
      </Modal.Header>
    
      <Modal.Body>
        <p>is already added to phonebook, replace the old number with a new one?</p>
      </Modal.Body>
    
      <Modal.Footer>
        <Button variant="secondary" 
          onClick={props.closeConfirmChangeModal}>Cancel</Button>
        <Button variant="primary" 
          onClick={props.handleChangeNumberModalOK}>OK</Button>
      </Modal.Footer>
    </Modal.Dialog>
  </Modal>
     )
  }
  
  export default ChangeNumberModal;
