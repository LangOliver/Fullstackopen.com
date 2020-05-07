

const ChangeNumberModal = (props) => {

    return (
        <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Update Number</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
          <p>is already added to phonebook, replace the old number with a new one?</p>
        </Modal.Body>
      
        <Modal.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">OK</Button>
        </Modal.Footer>
      </Modal.Dialog>
     )
  }
  
  export default ChangeNumberModal;
