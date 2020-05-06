import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PhonebookDataService from './services/PhonebookDataService'
import './index.css'
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
        console.log("Got new persons from book after adding")
        setPersons(persons.concat(response))
        setNewName("") 
        setNewPhoneNumber("") 

        }
      ).catch(error =>  {
        console.log("error posting", error)
      }) 
      setPersonsToShow(persons)

  }

  const changeFilter = (event) => {
    /* Apply filter only when the string is not an null/empty string
    */
    setPersonsToShow(!event.target.value ? persons : persons.filter
      (person =>  
      person.name.includes(event.target.value)
    ))
  }

  return (
    <div>
      <h2 className="app-title">Phonebook</h2>
      
      <PersonForm addPerson={addPerson} 
        newName = {newName} setNewName={setNewName}
        newPhoneNumber={newPhoneNumber} setNewPhoneNumber={setNewPhoneNumber}
        changeFilter = {changeFilter}>
      </PersonForm>
      <br></br>
      <h2 className="contacts">Numbers</h2>
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

