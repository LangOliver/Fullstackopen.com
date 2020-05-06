import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PhonebookDataService from './services/PhonebookDataService'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber] = useState('')  
  // In the beginning, show all all persons
  const [personsToShow, setPersonsToShow] = useState(persons)
  
  
   useEffect(() => {
    PhonebookDataService.getAll()
      .then(response => {
        console.log("effect response is", response)
        setPersons(response)
        setPersonsToShow(response) 
      })
  }, [])

  /* handles the form change of adding a Person by,
  creating a new contact object, implicitly creating a new array with
  the new contact included with concat and finally
  resetting the default form values by changing their state hooks
  */
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      id: persons.length +1,
      name: newName,
      number: newPhoneNumber
    }
    PhonebookDataService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName("gugus")        
        }
      ).catch(error =>  {
        console.log("error posting", error)
      }) 
        
  }

  const setName = (event) => {
    console.log(' Name changed to ', event.target.value)
    setNewName(event.target.value)
  }
  
  const setPhoneNumber = (event) =>  {
    setNewPhoneNumber(event.target.value)
  }
  

  const changeFilter =(event) => {
    /* Apply filter only when the string is not an null/empty string
    */
    setPersonsToShow(!event.target.value ? persons : persons.filter
      (person =>  
      person.name.includes(event.target.value)
    ))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} 
        setName ={setName} 
        setPhoneNumber={setPhoneNumber}
        changeFilter = {changeFilter}>
      </PersonForm>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}></Persons>
    </div>

  )
}

export default App

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

