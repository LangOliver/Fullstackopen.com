import React from 'react';

const SearchForm = (props) => (
  <form onChange={props.changeFilter}>find countries 
        <input type="text"></input>
    </form>
);

export default SearchForm;
