import React from 'react';
import Form from 'react-bootstrap/Form';

const Filter = (props) => {
    return (


            <Form.Control placeholder="Filter contacts "
            onChange={props.changeFilter}/>
  

    )
}

export default Filter;

