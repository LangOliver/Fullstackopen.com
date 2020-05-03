import React ,{useState} from 'react';
import CountryDetail from './CountryDetails';
import Country from './Country'

function Countries(props) { 
    /**
     * Show a hint if more than 10 results, show details of the country
     * if only one country matches the filter, show a message if no country
     * is found
     */
    if (props.filteredCountries.length > 10)  {
        return (<div>Too many matches, specify another filter</div>); }
    else if (props.filteredCountries.length > 1) { 
        return (
            <div>
            <ul>{props.filteredCountries.map(filteredCountry => 
                <Country filteredCountry = {filteredCountry}/>)}
            </ul>
        </div>
        );
    }
    else if (props.filteredCountries.length === 1){
        return (
            <CountryDetail filteredCountry={props.filteredCountries[0]}/>
        )
    }
    else {
        return <div>No countries found</div>
    }

}

export default Countries;
