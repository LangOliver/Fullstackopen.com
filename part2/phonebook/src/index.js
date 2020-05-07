import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import ListGroup from 'react-bootstrap/ListGroup'
import PhonebookDataService from './services/PhonebookDataService'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber] = useState('')  
  // In the beginning, show all all persons
  
  
   useEffect(() => {
    PhonebookDataService.getAll()
      .then(response => {
        console.log("effect response is", response)
        setPersons(response)
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
    /* Check if there is already a person with that name
    */
    const existingPersons = persons.filter
      (person =>  
      person.name === newPerson.name) 
    console.log('Existing person: ', existingPersons.length)

    if (existingPersons.length === 1) {
      /* Found exactly one existing Contact with the same name, 
      lets update the number
      */
      PhonebookDataService
      .update(existingPersons[0].id, newPerson)
      .then(response => {
        // Update the new number in the array
        persons[response.id-1] = response
        setPersons(persons)
        setNewName("") 
        setNewPhoneNumber("") 
        }
      ).catch(error =>  {
        console.log("error posting", error)
      }) 
    }
    /* Add the new person if the name doesn't exist yet
    */
    else {
      PhonebookDataService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName("") 
        setNewPhoneNumber("") 
        }
      ).catch(error =>  {
        console.log("error posting", error)
      }) 
    }
   

  }
    /* Reload the Persons from the database, 
    and apply filter only when the string is not an null/empty string,
    else just return the whole reponse
    */
  const changeFilter = (event) => {
   
   const currentFilter = event.target.value
   PhonebookDataService.getAll()
   .then(response => {
     setPersons(!currentFilter ? response : response.filter
      (person =>  
      person.name.includes(currentFilter)
    ))
   })
    
  }

  return (
    <div>
      <h2 className="app-title">Phonebook</h2>
      
      <PersonForm addPerson={addPerson} 
        newName = {newName} setNewName={setNewName}
        newPhoneNumber={newPhoneNumber} 
        setNewPhoneNumber={setNewPhoneNumber}
        changeFilter = {changeFilter}>
      </PersonForm>
      <br></br>
      <h2 className="contacts">Numbers</h2>
      
      <Persons 
        persons={persons}
        setPersons={setPersons}>
      </Persons>
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

