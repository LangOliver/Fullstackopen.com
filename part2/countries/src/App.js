import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import SearchForm from './components/SearchForm';
import ShowCountries from './components/ShowCountries';
import ShowCountry from './components/ShowCountry';


function App() {

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
if less than 10 elements are found */
const changeFilter =(event) => {
 setFilter(event.target.value) 
 const tempFilteredCountries = countries.filter(country =>  
 country.name.includes(event.target.value))
setFilteredCountries(tempFilteredCountries)

}


  return (
    <div>
      <SearchForm changeFilter = {changeFilter}/>
      <ShowCountries 
      filteredCountries = {filteredCountries} /> 
     
      
    </div>
  );
}

export default App;
