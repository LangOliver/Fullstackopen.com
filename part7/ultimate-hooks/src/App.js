  
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

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const fetchData = useCallback(async () => {
    const result = await axios(baseUrl).catch(err => console.log('Error caught in the api call: ', err))
    setResources(result.data)
    },)
  useEffect(() => {
    fetchData()},[baseUrl])

  const create = async(resource) => {
    const result = await axios(baseUrl, resource).catch(err => console.log('Error caught in the api call: ', err))
    setResources(resources.concat({resource}))
  }}
  
  const service = {
    create
  }

  return [
    resources, service
  ]
}


export default App