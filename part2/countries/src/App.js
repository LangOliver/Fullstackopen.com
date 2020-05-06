import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import SearchForm from './components/SearchForm';
import Countries from './components/Countries';

function App() {

  // variable api_key has now the value set in startup 
 const [filterName, setFilter] = useState("")
 const [countries, setCountries] = useState([])
 const [filteredCountries, setFilteredCountries] = useState([])

 // Initialize all existing countries from a web rest api
 useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
       setCountries(response.data)
    })
}, [])

/* Someone typed in the filter field, lets filter the countries and return
a reduced set of them matching country name and the filter input,
ignoring upper/lower case */
const changeFilter =(event) => {
 setFilter(event.target.value) 
 const tempFilteredCountries = countries.filter(country =>  
 country.name.toUpperCase().includes(event.target.value.toUpperCase()))
setFilteredCountries(tempFilteredCountries)

}

  return (
    <div>
      <SearchForm changeFilter = {changeFilter}/>
      <Countries 
      filteredCountries = {filteredCountries} /> 
     
    </div>
  );
}

export default App;
