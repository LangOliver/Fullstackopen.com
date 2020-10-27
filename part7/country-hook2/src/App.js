import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const fetchData = useCallback(async () => {
    const result = await axios(
      'https://restcountries.eu/rest/v2/name/'+ name + '?fullText=true',
      ).catch(err => console.log('Error caught in the api call: ',err))
      setCountry(result)
    }, )
  useEffect(() => {
    fetchData()},[name]
  )

  /* Build the object consumed and rendered in the Country Component */
  var countryObject = null
  if (country != null) {
    countryObject = {
      found: true,
      data: country.data[0]
    }
    return countryObject
  }
  return {found: false}
  
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}


const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App