import React from 'react';

function ShowCountry(props) { 
    const isOnlyOneCountry = props.isOnlyOneCountry;
    if (props.isTooManyCountries)  {
        return (<div>Too many pls specify</div>); }

    else if (isOnlyOneCountry)  {
        return (<div></div>); }
    else { return (
        <div>
        <ul>{props.filteredCountry.map(filteredCountry => 
            <li key={filteredCountry.name}>{filteredCountry.name} {filteredCountry.capital}</li>)}
        </ul>
      </div>
    );
}

   

}


export default ShowCountry;




