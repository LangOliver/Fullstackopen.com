import React from 'react';
const Filter = (props) => {
    return (

      <form>
      <div>
        filter shown with <input onChange={props.changeFilter}></input>
      </div>
    </form>
    )
}

export default Filter;

