import ReactDOM from 'react-dom';
import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
 const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber] = useState('')  
  // In the beginning, show all all persons
  const [personsToShow, setPersonsToShow] = useState(persons)

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
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewPhoneNumber('')
  }

  const setName = (event) => {
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
      <Filter changeFilter = {changeFilter}></Filter>
      <PersonForm addPerson={addPerson} setName ={setName} setPhoneNumber={setPhoneNumber}>
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

