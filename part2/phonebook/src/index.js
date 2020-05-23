import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PhonebookDataService from './services/PhonebookDataService'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ChangeNumberModal from './components/ChangeNumberModal'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber] = useState('') 
  const [ show, setShow] = useState(false)
  const [ existingPersonId, setExistingPersonId] = useState(null)
  const [ newPerson, setNewPerson] = useState(null)
  const [ statusMessage, setStatusMessage] = useState(null)

  

  // In the beginning, show all all persons
   useEffect(() => {
    PhonebookDataService.getAll()
      .then(response => {
        console.log("getAll response is", response)
        setPersons(response)
      })
  }, [])

  
  const handleChangeNumberModalOK = () =>  {
    PhonebookDataService
        .update(existingPersonId, newPerson)
        .then(response => {
          // Update the new number in the array
          let tempPersons = [...persons]
          tempPersons = tempPersons.map(person => {
            if (person.id === response.id) {
              return response
            } 
            else {
              return person
            }
            
          })
          setPersons(tempPersons)

          }
        ).catch(error => {
          setStatusMessage({type:'error', message:
                `Person '${newPerson.name}' was already removed from the server realMessage:' ${error}`}
              )
          setTimeout(() => {
            setStatusMessage(null)
          }, 5000)}
         )
    closeConfirmChangeModal()  
  }
  
  const clearAddPersonState = () => {
    setPersons(persons)
    setNewName("") 
    setNewPhoneNumber("") 
    setNewPerson(null)
    setExistingPersonId(null)
  }
  
    const closeConfirmChangeModal = () => {
      clearAddPersonState()
      setShow(false)}
  
    const showConfirmChangeModal = () => {
      setShow(true)
    }

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

    if (existingPersons.length === 1) {
      /* Found exactly one existing Contact with the same name, 
      lets update the number
      */
     setExistingPersonId(existingPersons[0].id)
     setNewPerson(newPerson)
     showConfirmChangeModal()
    }
    else if (existingPersons.length > 1) {
      setStatusMessage({type: 'error', message: 
        `Oops, more than one person with same name, can't do anything`})
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
      clearAddPersonState()
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
        setStatusMessage({type: 'success', message:
          `Person '${newPerson.name}' was added to the server`}
        )
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
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
      <Notification 
      message = {statusMessage} />
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
      <ChangeNumberModal show = {show} 
        handleChangeNumberModalOK={handleChangeNumberModalOK}
        closeConfirmChangeModal={closeConfirmChangeModal}
      />
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

