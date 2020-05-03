import React from 'react';

function ShowCountries(props) { 

    if (props.filteredCountries.length > 10)  {
        return (<div>Too many pls specify</div>); }
    else if (props.filteredCountries.length > 1) { return (
        <div>
        <ul>{props.filteredCountries.map(filteredCountry => 
            <li key={filteredCountry.name}>{filteredCountry.name}</li>)}
        </ul>
      </div>
        );
    }
    else if (props.filteredCountries.length === 1){
        return (
        <div>
            <ul>{props.filteredCountries.map(filteredCountry => 
                <li key={filteredCountry.name}>{filteredCountry.name}
                {filteredCountry.capital}</li>)}
            </ul>
        </div>
        )
    }
    else {
        return <div>No countries found</div>
    }

}


export default ShowCountries;
