  
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Table, Form } from 'react-bootstrap'


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


const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
    .then(response => response.data)
    .then(response => setResources(response))
    .catch(err => console.log("Something bad happend: " +err + "while trying to fetch data on useResource: " + baseUrl))
  },[])

  const create = (resource) => {
    axios.post(baseUrl,resource)
    .then(response => setResources(resources.concat(response.data)))
    .catch(err => console.log("Something bad happend: " + err + "while trying to post data on useResource: " + baseUrl))

  }
  const service = {
    create
  }
  
  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')


  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
        <div className="container">
          <h2>notes</h2>
          <form onSubmit={handleNoteSubmit}>
            <input {...content} />
            <button>create</button>
          </form>
          <Table striped>
      <tbody>
        {notes.map(note =>
          <tr key={note.id}>
            <td>
                {note.content}
            </td>
            <td>
              {note.user}
            </td>
          </tr>
        )}
      </tbody>
    </Table>

          <h2>persons</h2>
          <Form onSubmit={handlePersonSubmit}>
            name <input {...name} /> <br/>
            number <input {...number} />
            <button>create</button>
          </Form>
          <Table striped>
      <tbody>
        {persons.map(person =>
          <tr key={person.id}>
            <td>
                {person.name} {person.number}
            </td>
           
          </tr>
        )}
      </tbody>
    </Table>    </div>
  )
}

export default App